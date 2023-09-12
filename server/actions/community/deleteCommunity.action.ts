"use server";

import { CommunityModel, ThreadModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";
import { DeletedObjectJSON } from "@clerk/nextjs/server";

export async function deleteCommunityAction(
	communityId: DeletedObjectJSON["id"]
) {
	try {
		connectToDB();

		// * Find the community by its ID and delete it
		const deletedCommunity = await CommunityModel.findOneAndDelete({
			id: communityId,
		});

		if (!deletedCommunity) throw new Error("Community not found");

		// * Delete all threads associated with the community
		await ThreadModel.deleteMany({ community: deletedCommunity._id });

		// * Find all users who are part of the community
		const communityUsers = await UserModel.find({
			communities: deletedCommunity._id,
		});

		// * Remove the community from the 'communities' array for each user
		const updateUserPromises = communityUsers.map((user: any) => {
			user.communities.pull(deletedCommunity._id);
			return user.save();
		});

		await Promise.all(updateUserPromises);

		return deletedCommunity;
	} catch (error) {
		console.error("Error deleting community: ", error);
		throw new Error(`Error deleting community: ${error}`);
	}
}
