"use server";

import { CommunityModel, ThreadModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";

export async function updateCommunityInfoAction(
	communityId: string,
	name: string,
	username: string,
	image: string
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
