"use server";

import { CommunityModel, UserModel } from "../../models";
import { connectToDB } from "../../db/connect";
import { CommunityType } from "@/types";

export async function getCommunityDetailsAction(id: CommunityType["id"]) {
	try {
		connectToDB();

		const communityDetails = await CommunityModel.findOne<CommunityType>({
			id,
		}).populate([
			{
				path: "createdBy",
				model: UserModel,
				select: "name username image _id",
			},
			{
				path: "members",
				model: UserModel,
				select: "name username image _id",
			},
		]);

		return communityDetails;
	} catch (error) {
		console.error("Error getting community details:", error);
		throw new Error(`Error getting community details: ${error}`);
	}
}
