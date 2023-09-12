"use server";

import { CommunityModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";
import { OrganizationJSON } from "@clerk/nextjs/server";

interface CreateCommunityActionParams {
	id: OrganizationJSON["id"];
	name: OrganizationJSON["name"];
	username: OrganizationJSON["slug"];
	image: OrganizationJSON["image_url"];
	createdBy: OrganizationJSON["created_by"];
}

export async function createCommunityAction({
	id,
	name,
	username,
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
