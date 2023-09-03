"use server";

import { ModelsNames, ThreadModel, connectToDB } from "@/server";
import { ThreadType, UserType } from "@/types";

export async function getUserRepliesThreadsAction(userId: UserType["_id"]) {
	try {
		connectToDB();

		const threads: ThreadType[] = await ThreadModel.find<ThreadType[]>({
			author: userId,
			parentId: { $exists: true },
		})
			.sort({ createdAt: "desc" })
			.populate({
				path: "author",
				model: ModelsNames.User,
				select: "_id id name username image",
			})
			.populate({
				path: "community",
				model: ModelsNames.Community,
			})
			.populate({
				path: "comments",
				populate: {
					path: "author",
					model: ModelsNames.User,
					select: "_id id name username image",
				},
			});

		return { threads };
	} catch (error: any) {
		throw new Error(`Failed to get threads: ${error.message}`);
	}
}
