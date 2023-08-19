"use server";

import { UserModel, connectToDB } from "@/server";
import { UserType } from "@/types";

export const getUserAction = async (userId: string) => {
	connectToDB();

	try {
		return await UserModel.findOne<UserType>({ id: userId });
	} catch (error: any) {
		throw new Error(`Failed to get user: ${error.message}`);
	}
};
