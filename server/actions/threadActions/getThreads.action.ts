"use server";

import { ModelsNames, ThreadModel, connectToDB } from "@/server";

interface GetThreadsActionParams {
	page?: number;
	limit?: number;
}

export async function getThreadsAction({
	page = 1,
	limit = 20,
}: GetThreadsActionParams) {
	connectToDB();

	const skipAmount = (page - 1) * limit;

	try {
		const threadsQuery = ThreadModel.find({
			parentId: { $in: [null, undefined] },
		})
			.sort({ createdAt: "desc" })
			.skip(skipAmount)
			.limit(limit)
			.populate({ path: "author", model: ModelsNames.User })
			.populate({
				path: "children",
				populate: {
					path: "author",
					model: ModelsNames.User,
					select: "_id name parentId username image",
				},
			});

		const totalThreadsCount = await ThreadModel.countDocuments({
			parentId: { $in: [null, undefined] },
		});

		const threads = await threadsQuery.exec();
		const isNext = totalThreadsCount > skipAmount + threads.length;

		return { threads, isNext };
	} catch (error: any) {
		throw new Error(`Failed to get threads: ${error.message}`);
	}
}
