"use server";

import { ModelsNames, ThreadModel, UserModel, connectToDB } from "@/server";
import { ThreadType, UserType } from "@/types";

export async function getUserThreadsAction(userId: UserType["_id"]): Promise<{
	threads: ThreadType[];
}> {
	connectToDB();

	try {
		const user = await UserModel.findOne<UserType & { threads: ThreadType[] }>({
			_id: userId,
		}).populate({
			path: "threads",
			model: ModelsNames.Thread,
			populate: [
				{
					path: "community",
					model: ModelsNames.Community,
					select: "name id image _id",
				},
				{
					path: "author",
					model: ModelsNames.User,
					select: "_id id name username image",
				},
				{
					path: "comments",
					model: ModelsNames.Thread,
					populate: {
						path: "author",
						model: ModelsNames.User,
						select: "_id id name username image",
					},
				},
			],
		});

		if (!user) throw new Error("User not found");

		return { threads: user.threads as ThreadType[] };
	} catch (error: any) {
		throw new Error(`Failed to get user threads: ${error.message}`);
	}
}
