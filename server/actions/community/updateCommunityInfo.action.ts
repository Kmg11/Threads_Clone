"use server";

import { CommunityModel, ThreadModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";
import { OrganizationJSON } from "@clerk/nextjs/server";

export async function updateCommunityInfoAction(
	communityId: OrganizationJSON["id"],
	name: OrganizationJSON["name"],
	username: OrganizationJSON["slug"],
	image: OrganizationJSON["image_url"]
) {
	try {
		connectToDB();

		// * Find the community by its _id and update the information
		const updatedCommunity = await CommunityModel.findOneAndUpdate(
			{ id: communityId },
			{ name, username, image }
		);

		if (!updatedCommunity) {
			throw new Error("Community not found");
		}

		return updatedCommunity;
	} catch (error) {
		console.error("Error updating community information:", error);
		throw new Error(`Error updating community information: ${error}`);
	}
}
