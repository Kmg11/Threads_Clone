"use server";

import { ModelsNames, ThreadModel, connectToDB } from "@/server";
import { ThreadType } from "@/types";

interface GetThreadsActionParams {
	page?: number;
	limit?: number;
}

export async function getThreadsAction({
	page = 1,
	limit = 20,
}: GetThreadsActionParams): Promise<{
	threads: ThreadType[];
	isNext: boolean;
}> {
	connectToDB();

	const skipAmount = (page - 1) * limit;

	try {
		const threadsQuery = ThreadModel.find({
			parentId: { $in: [null, undefined] },
		})
			.sort({ createdAt: "desc" })
			.skip(skipAmount)
			.limit(limit)
			.populate({
				path: "author",
				model: ModelsNames.User,
				select: "_id name parentId username image",
			})
			.populate({
				path: "comments",
				populate: {
					path: "author",
					model: ModelsNames.User,
					select: "_id name parentId username image",
				},
			});

		const totalThreadsCount = await ThreadModel.countDocuments({
			parentId: { $in: [null, undefined] },
		});

		const threads = (await threadsQuery.exec()) as ThreadType[];
		const isNext = totalThreadsCount > skipAmount + threads.length;

		return { threads, isNext };
	} catch (error: any) {
		throw new Error(`Failed to get threads: ${error.message}`);
	}
}
