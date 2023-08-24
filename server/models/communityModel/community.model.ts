import { ModelsNames } from "@/server";
import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true }, // * This is the clerk id
	username: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	image: { type: String },
	bio: { type: String },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: ModelsNames.User },

	threads: [{ type: mongoose.Schema.Types.ObjectId, ref: ModelsNames.Thread }],
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: ModelsNames.User }],
});

export const CommunityModel =
	mongoose.models.Community ||
	mongoose.model(ModelsNames.Community, communitySchema);
