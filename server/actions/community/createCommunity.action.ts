"use server";

import { CommunityModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";

interface CreateCommunityActionParams {
	id: string | number | Record<string, string>[];
	name: string | number | Record<string, string>[];
	username: string | number | Record<string, string>[];
	image: string | number | Record<string, string>[];
	bio: string | number | Record<string, string>[];
	createdBy: string | number | Record<string, string>[];
}

export async function createCommunityAction({
	id,
	name,
	username,
	bio,
	image,
	createdBy,
}: CreateCommunityActionParams) {
	try {
		connectToDB();

		const user = await UserModel.findOne({ id: createdBy });
		if (!user) throw new Error("User not found");

		const newCommunity = new CommunityModel({
			id,
			name,
			username,
			image,
			bio,
			createdBy: user._id,
		});

		const createdCommunity = await newCommunity.save();

		user.communities.push(createdCommunity._id);

		await user.save();

		return createdCommunity;
	} catch (error) {
		console.log("Error creating community:", error);
		throw new Error(`Error creating community: ${error}`);
	}
}
