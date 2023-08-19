import { ModelsNames } from "@/server";
import { ThreadDocumentType } from "@/types";
import mongoose from "mongoose";

const threadSchema = new mongoose.Schema<ThreadDocumentType>(
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
			default: null,
		},

		parentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: ModelsNames.Thread,
			default: null,
		},

		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: ModelsNames.Thread,
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

export const ThreadModel =
	mongoose.models.Thread ||
	mongoose.model<ThreadDocumentType>(ModelsNames.Thread, threadSchema);
