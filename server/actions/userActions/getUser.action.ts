"use server";

import { UserModel, connectToDB } from "@/server";
import { UserType } from "@/types";

export const getUserAction = async (userId: string) => {
	try {
		connectToDB();

		return await UserModel.findOne<UserType>({ id: userId });
	} catch (error: any) {
		throw new Error(`Failed to get user: ${error.message}`);
	}
};
