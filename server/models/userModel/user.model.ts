import { ModelsNames } from "@/server";
import { UserDocumentType } from "@/types";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<UserDocumentType>({
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

export const UserModel: mongoose.Model<
	UserDocumentType,
	{},
	{},
	{},
	mongoose.Document<unknown, {}, UserDocumentType> &
		UserDocumentType &
		Required<{}>,
	any
> =
	mongoose.models.User ||
	mongoose.model<UserDocumentType>(ModelsNames.User, userSchema);
