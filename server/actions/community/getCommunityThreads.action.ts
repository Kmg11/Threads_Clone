"use server";

import { CommunityModel, ThreadModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";
import { CommunityType, ThreadType } from "@/types";

interface GetCommunityThreadsActionReturnType
	extends Omit<CommunityType, "threads"> {
	threads: ThreadType[];
}

export async function getCommunityThreadsAction(_id: CommunityType["_id"]) {
	try {
		connectToDB();

		const communityPosts =
			await CommunityModel.findById<GetCommunityThreadsActionReturnType>(
				_id
			).populate({
				path: "threads",
				model: ThreadModel,
				populate: [
					{
						path: "author",
						model: UserModel,
						select: "_id name username image",
					},
					{
						path: "comments",
						model: ThreadModel,
						populate: {
							path: "author",
							model: UserModel,
							select: "_id name username image",
						},
					},
				],
			});

		if (!communityPosts) throw new Error("Community not found");

		return communityPosts;
	} catch (error) {
		console.error("Error getting community threads:", error);
		throw new Error(`Error getting community threads: ${error}`);
	}
}
