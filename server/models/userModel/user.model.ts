import { ModelsNames } from "@/server";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true }, // * This is the clerk id
	username: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	image: { type: String },
	bio: { type: String },
	onboarded: { type: Boolean, default: false },

	threads: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: ModelsNames.Thread,
		},
	],

	communities: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: ModelsNames.Community,
		},
	],
});

export const UserModel =
	mongoose.models.User || mongoose.model(ModelsNames.User, userSchema);
