import { ModelsNames } from "@/server";
import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },

		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: ModelsNames.User,
			required: true,
		},

		community: {
			type: mongoose.Schema.Types.ObjectId,
			ref: ModelsNames.Community,
		},

		parentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: ModelsNames.Thread,
		},

		children: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: ModelsNames.Thread,
			},
		],
	},
	{ timestamps: true }
);

export const ThreadModel =
	mongoose.models.Thread || mongoose.model(ModelsNames.Thread, threadSchema);
