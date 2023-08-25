"use server";

import { CommunityModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";

export async function removeMemberFromCommunityAction(
	userId: string,
	communityId: string
) {
	try {
		connectToDB();

		const userIdObject = await UserModel.findOne({ id: userId }, { _id: 1 });
		const communityIdObject = await CommunityModel.findOne(
			{ id: communityId },
			{ _id: 1 }
		);

		if (!userIdObject) {
			throw new Error("User not found");
		}

		if (!communityIdObject) {
			throw new Error("Community not found");
		}

		// * Remove the user's _id from the members array in the community
		await CommunityModel.updateOne(
			{ _id: communityIdObject._id },
			{ $pull: { members: userIdObject._id } }
		);

		// * Remove the community's _id from the communities array in the user
		await UserModel.updateOne(
			{ _id: userIdObject._id },
			{ $pull: { communities: communityIdObject._id } }
		);

		return { success: true };
	} catch (error) {
		console.error("Error removing user from community:", error);
		throw new Error(`Error removing user from community: ${error}`);
	}
}
