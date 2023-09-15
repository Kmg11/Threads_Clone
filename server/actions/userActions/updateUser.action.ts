"use server";

import { ROUTES } from "@/constants";
import { UserModel, connectToDB } from "@/server";
import { UserType } from "@/types";
import { revalidatePath } from "next/cache";

interface UpdateUserActionParams
	extends Pick<UserType, "name" | "username" | "image" | "bio"> {
	userId: string;
	path: string;
	insertIfNotExists?: boolean;
	makeOnboarded?: boolean;
}

export async function updateUserAction({
	userId,
	username,
	name,
	bio,
	image,
	path,
	insertIfNotExists = true,
	makeOnboarded = true,
}: UpdateUserActionParams) {
	try {
		connectToDB();

		const user = await UserModel.findOne({ id: userId });

		const updatedUser = await UserModel.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: makeOnboarded ? true : user?.onboarded,
			},
			{ upsert: insertIfNotExists, new: true }
		);

		if (path === ROUTES.PROFILE.EDIT) {
			revalidatePath(path);
		}

		return { updatedUser };
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
}
