"use server";

import { UserModel, connectToDB } from "@/server";

export const getUserAction = async (userId: string) => {
	connectToDB();

	try {
		return await UserModel.findOne({ id: userId });
	} catch (error: any) {
		throw new Error(`Failed to get user: ${error.message}`);
	}
};
