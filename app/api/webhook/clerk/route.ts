import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { deleteCommunityAction } from "@/server/actions/community/deleteCommunity.action";
import { createCommunityAction } from "@/server/actions/community/createCommunity.action";
import { addMemberToCommunityAction } from "@/server/actions/community/addMemberToCommunity.action";
import { removeMemberFromCommunityAction } from "@/server/actions/community/removeMemberFromCommunity.action";
import { updateCommunityInfoAction } from "@/server/actions/community/updateCommunityInfo.action";
import { updateUserAction } from "@/server/actions/userActions/updateUser.action";
import { deleteUserAction } from "@/server/actions/userActions/deleteUser.action";
import { WebhookEvent } from "@clerk/nextjs/server";

export const POST = async (request: Request) => {
	const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add NEXT_CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	// * Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", { status: 400 });
	}

	// * Get the body
	const payload = await request.json();
	const body = JSON.stringify(payload);

	// * Create a new SVIX instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);
	let event: WebhookEvent;

	// * Verify the payload with the headers
	try {
		event = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", { status: 400 });
	}

	// * Listen organization created event
	if (event.type === "organization.created") {
		const { id, name, slug, image_url, created_by } = event.data;

		try {
			await createCommunityAction({
				id,
				name,
				username: slug,
				image: image_url,
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

	// * Listen organization membership (member invite & accepted) creation
	if (event.type === "organizationMembership.created") {
		try {
			const { organization, public_user_data } = event.data;

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
	if (event.type === "organizationMembership.deleted") {
		try {
			const { organization, public_user_data } = event.data;

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
	if (event.type === "organization.updated") {
		try {
			const { id, image_url, name, slug } = event.data;

			await updateCommunityInfoAction(id, name, slug, image_url);

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
	if (event.type === "organization.deleted") {
		try {
			await deleteCommunityAction(event.data.id);

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
	if (event.type === "user.updated") {
		try {
			const { id, first_name, last_name, username, image_url } = event.data;

			await updateUserAction({
				userId: id,
				name: `${first_name} ${last_name}`,
				username: username as string,
				image: image_url,
				path: "/",
				insertIfNotExists: false,
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

	// * Listen user deletion
	if (event.type === "user.deleted") {
		try {
			await deleteUserAction(event.data.id as string);

			return NextResponse.json({ message: "User deleted" }, { status: 201 });
		} catch (err) {
			console.log(err);

			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json({ message: "This Worked", success: true });
};
