"use server";

import { ThreadModel, UserModel, connectToDB } from "@/server";
import { UserType } from "@/types";
import { revalidatePath } from "next/cache";

interface CreateThreadActionParams {
	text: string;
	author: UserType["_id"];
	communityId: string | null;
	path: string;
}

export async function createThreadAction({
	text,
	author,
	communityId,
	path,
}: CreateThreadActionParams) {
	connectToDB();

	try {
		const createdThread = await ThreadModel.create({
			text,
			author,
			community: null,
		});

		await UserModel.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id },
		});

		revalidatePath(path);

		return { createdThread };
	} catch (error: any) {
		throw new Error(`Failed to create thread: ${error.message}`);
	}
}
