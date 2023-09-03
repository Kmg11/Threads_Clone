"use server";

import { ModelsNames, ThreadModel, UserModel, connectToDB } from "@/server";
import { ThreadDocumentType, ThreadType, UserType } from "@/types";

export const getActivitiesAction = async (userId: UserType["_id"]) => {
	try {
		connectToDB();

		// * Find all threads created by the user
		const userThreads = await ThreadModel.find({ author: userId });

		// * Collect all comments threads ids (replies) from the 'comments' field
		const commentsThreadsIds = userThreads.reduce((acc, thread) => {
			return [...acc, ...thread.comments];
		}, []);

		const replies = await ThreadModel.find<
			Omit<ThreadType, "comments"> & Pick<ThreadDocumentType, "comments">
		>({
			_id: { $in: commentsThreadsIds },
			author: { $ne: userId },
		})
			.sort({ createdAt: -1 })
			.limit(30)
			.populate({
				path: "author",
				model: ModelsNames.User,
				select: "_id id name username image",
			});

		return { activities: replies };
	} catch (error: any) {
		throw new Error(`Failed to get activity: ${error.message}`);
	}
};
