"use server";

import { ModelsNames, ThreadModel, connectToDB } from "@/server";
import { ThreadType } from "@/types";

export async function getThreadAction(
	threadId: string
): Promise<{ thread: ThreadType }> {
	connectToDB();

	try {
		const thread = await ThreadModel.findById<ThreadType>(threadId)
			.populate({
				path: "author",
				model: ModelsNames.User,
				select: "_id name parentId username image",
			})
			.populate({
				path: "comments",
				populate: [
					{
						path: "author",
						model: ModelsNames.User,
						select: "_id name parentId username image",
					},
					{
						path: "comments",
						model: ModelsNames.Thread,
						populate: {
							path: "author",
							model: ModelsNames.User,
							select: "_id name parentId username image",
						},
					},
				],
			});

		if (!thread) {
			throw new Error("Thread not found");
		}

		return { thread };
	} catch (error: any) {
		throw new Error(`Failed to get thread: ${error.message}`);
	}
}
