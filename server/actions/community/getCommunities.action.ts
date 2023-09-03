"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { CommunityModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";
import { CommunityType } from "@/types";

interface GetCommunitiesActionParams {
	searchString?: string;
	pageNumber?: number;
	pageSize?: number;
	sortBy?: SortOrder;
}

export async function getCommunitiesAction({
	searchString = "",
	pageNumber = 1,
	pageSize = 20,
	sortBy = "desc",
}: GetCommunitiesActionParams) {
	try {
		connectToDB();

		// * Calculate the number of communities to skip based on the page number and page size.
		const skipAmount = (pageNumber - 1) * pageSize;

		// * Create a case-insensitive regular expression for the provided search string.
		const regex = new RegExp(searchString, "i");

		// * Create an initial query object to filter communities.
		const query: FilterQuery<typeof CommunityModel> = {};

		// * If the search string is not empty, add the $or operator to match either username or name fields.
		if (searchString.trim() !== "") {
			query.$or = [
				{ username: { $regex: regex } },
				{ name: { $regex: regex } },
			];
		}

		// * Define the sort options for the fetched communities based on createdAt field and provided sort order.
		const sortOptions = { createdAt: sortBy };

		// * Create a query to fetch the communities based on the search and sort criteria.
		const communitiesQuery = CommunityModel.find<CommunityType>(query)
			.sort(sortOptions)
			.skip(skipAmount)
			.limit(pageSize)
			.populate([
				{
					path: "members",
					model: UserModel,
					select: "_id id username name image",
				},
				{
					path: "createdBy",
					model: UserModel,
					select: "_id id username name image",
				},
			]);

		// * Count the total number of communities that match the search criteria (without pagination).
		const totalCommunitiesCount = await CommunityModel.countDocuments(query);

		const communities = await communitiesQuery.exec();

		// * Check if there are more communities beyond the current page.
		const isNext = totalCommunitiesCount > skipAmount + communities.length;

		return { communities, isNext };
	} catch (error) {
		console.error("Error getting communities:", error);
		throw new Error(`Error getting communities: ${error}`);
	}
}
