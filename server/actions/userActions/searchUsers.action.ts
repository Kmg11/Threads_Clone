"use server";

import { UserModel, connectToDB } from "@/server";
import { UserType } from "@/types";
import { FilterQuery, SortOrder } from "mongoose";

interface SearchUsersActionParams {
	userId: UserType["_id"];
	page?: number;
	limit?: number;
	searchString?: string;
	sortBy?: SortOrder;
}

export const searchUsersAction = async ({
	userId,
	page = 1,
	limit = 20,
	searchString = "",
	sortBy = "desc",
}: SearchUsersActionParams) => {
	try {
		connectToDB();

		const skipAmount = (page - 1) * limit;
		const regex = new RegExp(searchString, "i");

		const query: FilterQuery<UserType> = {
			_id: { $ne: userId },
		};

		if (searchString.trim()) {
			query.$or = [{ username: regex }, { name: regex }];
		}

		const usersQuery = UserModel.find<UserType>(query)
			.sort({ createdAt: sortBy })
			.skip(skipAmount)
			.limit(limit);

		const totalUsersCount = await UserModel.countDocuments(query);
		const users = await usersQuery.exec();
		const isNext = totalUsersCount > skipAmount + users.length;

		return { users, isNext };
	} catch (error: any) {
		throw new Error(`Failed to search users: ${error.message}`);
	}
};
