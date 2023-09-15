"use server";

import { UserModel, connectToDB } from "@/server";
import { UserType } from "@/types";

interface CreateUserActionParams
	extends Pick<UserType, "name" | "username" | "image" | "bio"> {
	userId: string;
}

export async function createUserAction({
	userId,
	username,
	name,
	bio,
	image,
}: CreateUserActionParams) {
	try {
		connectToDB();

		const createdUser = await UserModel.create({
			username: username.toLowerCase(),
			id: userId,
			name,
			bio,
			image,
		});

		return { createdUser };
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
}
