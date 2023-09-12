"use server";

import { CommunityModel, ThreadModel, UserModel } from "@/server";
import { ThreadType, UserType } from "@/types";

async function gethAllDeletedThreads(threads: ThreadType[]) {
	if (threads.length === 0) return [];

	const deletedThreads = [...threads];
	const childThreads = await ThreadModel.find({
		parentId: { $in: threads.map((thread) => thread._id) },
	});

	const deletedChildThreadsIds = await gethAllDeletedThreads(childThreads);
	deletedThreads.push(...deletedChildThreadsIds);

	return deletedThreads;
}

export const deleteUserAction = async (userId: UserType["id"]) => {
	try {
		// * Delete user from database
		const deletedUser = await UserModel.findOneAndDelete({ id: userId });

		if (!deletedUser) throw new Error("User not found");

		// * Delete user threads and it's comments
		const userThreads = await ThreadModel.find({ author: deletedUser._id });
		const deletedThreads = await gethAllDeletedThreads(userThreads);
		const deletedThreadIds = deletedThreads.map((thread) => thread._id);

		// * Extract the communityIds to update Community models respectively
		const uniqueCommunityIds = new Set(
			[
				...deletedThreads.map((thread) => thread.community?._id?.toString()),
			].filter((id) => id !== undefined)
		);

		// * Recursively delete all threads and their comments
		await ThreadModel.deleteMany({ _id: { $in: deletedThreadIds } });

		// * Pull threads from user
		await UserModel.updateMany(
			{ _id: deletedUser?._id },
			{ $pull: { threads: { $in: userThreads.map((thread) => thread._id) } } }
		);

		// * Pull threads from community
		await CommunityModel.updateMany(
			{ _id: { $in: Array.from(uniqueCommunityIds) } },
			{ $pull: { threads: { $in: deletedThreadIds } } }
		);

		// * Find created communities by user
		const deletedCommunities = await CommunityModel.find({
			createdBy: deletedUser?._id,
		});

		// * Pull communities from users
		const pullCommunitiesFromUsers = UserModel.updateMany(
			{ _id: { $in: deletedCommunities.map((community) => community._id) } },
			{
				$pull: {
					communities: {
						$in: deletedCommunities.map((community) => community._id),
					},
				},
			}
		);

		// * Delete communities created by user
		const deleteCommunitiesCreatedByUser = CommunityModel.deleteMany({
			createdBy: deletedUser?._id,
		});

		// * Pull user from all communities
		const pullUserFromCommunities = CommunityModel.updateMany(
			{ _id: { $in: deletedUser?.communities } },
			{ $pull: { members: { $in: [deletedUser._id] } } }
		);

		Promise.all([
			pullCommunitiesFromUsers,
			deleteCommunitiesCreatedByUser,
			pullUserFromCommunities,
		]);

		return { deletedUser };
	} catch (error: any) {
		throw new Error(`Failed to delete user: ${error.message}`);
	}
};
