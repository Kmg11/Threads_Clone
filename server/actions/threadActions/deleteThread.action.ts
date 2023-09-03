"use server";

import { CommunityModel, ThreadModel, UserModel, connectToDB } from "@/server";
import { ThreadType } from "@/types";
import { revalidatePath } from "next/cache";

async function gethAllChildThreads(
	threadId: ThreadType["_id"]
): Promise<any[]> {
	const childThreads = await ThreadModel.find({ parentId: threadId });
	const descendantThreads = [];

	for (const childThread of childThreads) {
		const descendants = await gethAllChildThreads(childThread._id);
		descendantThreads.push(childThread, ...descendants);
	}

	return descendantThreads;
}

export async function deleteThreadAction(
	id: ThreadType["_id"],
	path: string
): Promise<void> {
	try {
		connectToDB();

		// * Find the thread to be deleted (the main thread)
		const mainThread = await ThreadModel.findById(id).populate(
			"author community"
		);

		if (!mainThread) throw new Error("Thread not found");

		// * Fetch all child threads and their descendants recursively
		const descendantThreads = await gethAllChildThreads(id);

		// * Get all descendant thread IDs including the main thread ID and child thread IDs
		const descendantThreadIds = [
			id,
			...descendantThreads.map((thread) => thread._id),
		];

		// * Extract the authorIds and communityIds to update User and Community models respectively
		const uniqueAuthorIds = new Set(
			[
				// * Use optional chaining to handle possible undefined values
				...descendantThreads.map((thread) => thread.author?._id?.toString()),
				mainThread.author?._id?.toString(),
			].filter((id) => id !== undefined)
		);

		const uniqueCommunityIds = new Set(
			[
				// * Use optional chaining to handle possible undefined values
				...descendantThreads.map((thread) => thread.community?._id?.toString()),
				mainThread.community?._id?.toString(),
			].filter((id) => id !== undefined)
		);

		// * Recursively delete child threads and their descendants
		await ThreadModel.deleteMany({ _id: { $in: descendantThreadIds } });

		// * Update User model
		await UserModel.updateMany(
			{ _id: { $in: Array.from(uniqueAuthorIds) } },
			{ $pull: { threads: { $in: descendantThreadIds } } }
		);

		// * Update Community model
		await CommunityModel.updateMany(
			{ _id: { $in: Array.from(uniqueCommunityIds) } },
			{ $pull: { threads: { $in: descendantThreadIds } } }
		);

		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Failed to delete thread: ${error.message}`);
	}
}
