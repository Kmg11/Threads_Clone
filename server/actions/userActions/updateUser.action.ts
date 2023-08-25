"use server";

import { UserModel, connectToDB } from "@/server";
import { UserType } from "@/types";
import { revalidatePath } from "next/cache";

interface UpdateUserActionParams
	extends Pick<UserType, "name" | "username" | "image" | "bio"> {
	userId: string;
	path: string;
}

export async function updateUserAction({
	userId,
	username,
	name,
	bio,
	image,
	path,
}: UpdateUserActionParams) {
	connectToDB();

	try {
		const updatedUser = await UserModel.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: true,
			},
			{ upsert: true, new: true }
		);

		if (path === "/profile/edit") {
			revalidatePath(path);
		}

		return { updatedUser };
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
}
