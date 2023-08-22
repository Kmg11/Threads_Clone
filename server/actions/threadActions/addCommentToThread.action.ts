"use server";

import { ThreadModel, UserModel, connectToDB } from "@/server";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

interface AddCommentToThreadActionParams {
	threadId: Types.ObjectId;
	commentText: string;
	userId: Types.ObjectId;
	path: string;
}

export async function addCommentToThreadAction({
	threadId,
	commentText,
	userId,
	path,
}: AddCommentToThreadActionParams) {
	connectToDB();

	try {
		// * Find the original thread by it's id
		const originalThread = await ThreadModel.findById(threadId);
		if (!originalThread) throw new Error("Thread not found");

		// * Create a new thread with a comment text
		const commentThread = new ThreadModel({
			text: commentText,
			author: userId,
			parentId: threadId,
		});

		// * Save the new thread
		const savedCommentThread = await commentThread.save();

		// * Update the original thread to include the new comment
		originalThread.comments.push(savedCommentThread._id);

		// * Save the original thread
		await originalThread.save();

		revalidatePath(path);

		return { commentThread: savedCommentThread };
	} catch (error: any) {
		throw new Error(`Failed to add comment to thread: ${error.message}`);
	}
}
