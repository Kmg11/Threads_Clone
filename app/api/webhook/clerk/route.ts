// Resource: https://clerk.com/docs/users/sync-data-to-your-backend
// Above article shows why we need webhooks i.e., to sync data to our backend

// Resource: https://docs.svix.com/receiving/verifying-payloads/why
// It's a good practice to verify webhooks. Above article shows why we should do it
import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
import {
	addMemberToCommunity,
	createCommunity,
	deleteCommunity,
	removeUserFromCommunity,
	updateCommunityInfo,
} from "@/server/actions/community/community.actions";

// Resource: https://clerk.com/docs/integration/webhooks#supported-events
// Above document lists the supported events
type EventType =
	| "organization.created"
	| "organizationInvitation.created"
	| "organizationMembership.created"
	| "organizationMembership.deleted"
	| "organization.updated"
	| "organization.deleted";

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

	// Activate Webhook in the Clerk Dashboard.
	// After adding the endpoint, you'll see the secret on the right side.
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

	// Listen organization creation event
	if (eventType === "organization.created") {
		// Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/CreateOrganization
		// Show what event?.data sends from above resource
		const { id, name, slug, logo_url, image_url, created_by } =
			event?.data ?? {};

		try {
			// @ts-ignore
			await createCommunity(
				// @ts-ignore
				id,
				name,
				slug,
				logo_url || image_url,
				"org bio",
				created_by
			);

			return NextResponse.json({ message: "User created" }, { status: 201 });
		} catch (err) {
			console.log(err);
			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	// Listen organization invitation creation event.
	// Just to show. You can avoid this or tell people that we can create a new mongoose action and
	// add pending invites in the database.
	if (eventType === "organizationInvitation.created") {
		try {
			// Resource: https://clerk.com/docs/reference/backend-api/tag/Organization-Invitations#operation/CreateOrganizationInvitation
			console.log("Invitation created", event?.data);

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

	// Listen organization membership (member invite & accepted) creation
	if (eventType === "organizationMembership.created") {
		try {
			// Resource: https://clerk.com/docs/reference/backend-api/tag/Organization-Memberships#operation/CreateOrganizationMembership
			// Show what event?.data sends from above resource
			const { organization, public_user_data } = event?.data;
			console.log("created", event?.data);

			// @ts-ignore
			await addMemberToCommunity(organization.id, public_user_data.user_id);

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

	// Listen member deletion event
	if (eventType === "organizationMembership.deleted") {
		try {
			// Resource: https://clerk.com/docs/reference/backend-api/tag/Organization-Memberships#operation/DeleteOrganizationMembership
			// Show what event?.data sends from above resource
			const { organization, public_user_data } = event?.data;
			console.log("removed", event?.data);

			// @ts-ignore
			await removeUserFromCommunity(public_user_data.user_id, organization.id);

			return NextResponse.json({ message: "Member removed" }, { status: 201 });
		} catch (err) {
			console.log(err);

			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	// Listen organization updating event
	if (eventType === "organization.updated") {
		try {
			// Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/UpdateOrganization
			// Show what event?.data sends from above resource
			const { id, logo_url, name, slug } = event?.data;
			console.log("updated", event?.data);

			// @ts-ignore
			await updateCommunityInfo(id, name, slug, logo_url);

			return NextResponse.json({ message: "Member removed" }, { status: 201 });
		} catch (err) {
			console.log(err);

			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
	}

	// Listen organization deletion event
	if (eventType === "organization.deleted") {
		try {
			// Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/DeleteOrganization
			// Show what event?.data sends from above resource
			const { id } = event?.data;
			console.log("deleted", event?.data);

			// @ts-ignore
			await deleteCommunity(id);

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
};
