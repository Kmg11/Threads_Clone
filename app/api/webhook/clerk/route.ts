import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
import { deleteCommunityAction } from "@/server/actions/community/deleteCommunity.action";
import { createCommunityAction } from "@/server/actions/community/createCommunity.action";
import { addMemberToCommunityAction } from "@/server/actions/community/addMemberToCommunity.action";
import { removeMemberFromCommunityAction } from "@/server/actions/community/removeMemberFromCommunity.action";
import { updateCommunityInfoAction } from "@/server/actions/community/updateCommunityInfo.action";
import { updateUserAction } from "@/server/actions/userActions/updateUser.action";

type EventType =
	| "organization.created"
	| "organizationInvitation.created"
	| "organizationMembership.created"
	| "organizationMembership.deleted"
	| "organization.updated"
	| "organization.deleted"
	| "user.updated"
	| "user.deleted";

type Event = {
	data: Record<string, string | number | Record<string, string>[]>;
	object: "event";
	type: EventType;
};

export const POST = async (request: Request) => {
	const payload = await request.json();
	const header = headers();

	const heads = {
		"svix-id": header.get("svix-id"),
		"svix-timestamp": header.get("svix-timestamp"),
		"svix-signature": header.get("svix-signature"),
	};

	const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");
	let event: Event | null = null;

	try {
		event = wh.verify(
			JSON.stringify(payload),
			heads as IncomingHttpHeaders & WebhookRequiredHeaders
		) as Event;
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 400 });
	}

	const eventType: EventType = event?.type!;

	// * Listen organization creation event
	if (eventType === "organization.created") {
		const { id, name, slug, logo_url, image_url, created_by } =
			event?.data ?? {};

		try {
			await createCommunityAction({
				id,
				name,
				username: slug,
				image: logo_url || image_url,
				bio: "org bio",
				createdBy: created_by,
			});

			return NextResponse.json({ message: "User created" }, { status: 201 });
		} catch (err) {
			console.log(err);
			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	// * Listen organization invitation creation event.
	// * Just to show. You can avoid this or tell people that we can create a new mongoose action and
	// * add pending invites in the database.
	if (eventType === "organizationInvitation.created") {
		try {
			return NextResponse.json(
				{ message: "Invitation created" },
				{ status: 201 }
			);
		} catch (err) {
			console.log(err);

			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	// * Listen organization membership (member invite & accepted) creation
	if (eventType === "organizationMembership.created") {
		try {
			const { organization, public_user_data } = event?.data as any;

			await addMemberToCommunityAction(
				organization.id,
				public_user_data.user_id
			);

			return NextResponse.json(
				{ message: "Invitation accepted" },
				{ status: 201 }
			);
		} catch (err) {
			console.log(err);

			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	// * Listen member deletion event
	if (eventType === "organizationMembership.deleted") {
		try {
			const { organization, public_user_data } = event?.data as any;

			await removeMemberFromCommunityAction(
				public_user_data.user_id,
				organization.id
			);

			return NextResponse.json({ message: "Member removed" }, { status: 201 });
		} catch (err) {
			console.log(err);

			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	// * Listen organization updating event
	if (eventType === "organization.updated") {
		try {
			const { id, logo_url, name, slug } = event?.data as any;

			await updateCommunityInfoAction(id, name, slug, logo_url);

			return NextResponse.json({ message: "Member removed" }, { status: 201 });
		} catch (err) {
			console.log(err);

			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	// * Listen organization deletion event
	if (eventType === "organization.deleted") {
		try {
			const { id } = event?.data as any;

			await deleteCommunityAction(id);

			return NextResponse.json(
				{ message: "Organization deleted" },
				{ status: 201 }
			);
		} catch (err) {
			console.log(err);

			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	// * Listen user updated
	if (eventType === "user.updated") {
		try {
			const { id, first_name, last_name, username, profile_image_url } =
				event?.data as any;

			await updateUserAction({
				userId: id,
				name: `${first_name} ${last_name}`,
				username,
				image: profile_image_url,
				path: "/",
			});

			return NextResponse.json(
				{ message: "User created or updated" },
				{ status: 201 }
			);
		} catch (err) {
			console.log(err);

			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	return;
};
