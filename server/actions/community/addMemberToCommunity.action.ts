"use server";

import { CommunityModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";

export async function addMemberToCommunityAction(
	communityId: string,
	memberId: string
) {
	try {
		connectToDB();

		// * Find the community by its unique id
		const community = await CommunityModel.findOne({ id: communityId });
		if (!community) throw new Error("Community not found");

		// * Find the user by their unique id
		const user = await UserModel.findOne({ id: memberId });
		if (!user) throw new Error("User not found");

		// * Check if the user is already a member of the community
		if (community.members.includes(user._id)) {
			throw new Error("User is already a member of the community");
		}

		// * Add the user's _id to the members array in the community
		community.members.push(user._id);
		await community.save();

		// * Check if the user is already a member of the community
		if (user.communities.includes(community._id)) {
			throw new Error("User is already a member of the community");
		}

		// * Add the community's _id to the communities array in the user
		user.communities.push(community._id);
		await user.save();

		return community;
	} catch (error) {
		console.error("Error adding member to community:", error);
		throw new Error(`Error adding member to community: ${error}`);
	}
}
