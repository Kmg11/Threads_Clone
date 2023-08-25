import mongoose from "mongoose";

export interface UserDocumentType {
	_id: mongoose.Types.ObjectId; // * Mongoose id
	id: string; // * Clerk id
	username: string;
	name: string;
	image?: string;
	bio?: string;
	onboarded: boolean;
	threads: mongoose.Types.ObjectId[];
	communities: mongoose.Types.ObjectId[];
	createdAt: string;
	updatedAt: string;
}

export interface UserType extends UserDocumentType {}

export type AuthorType = Pick<UserType, "_id" | "image" | "name" | "username">;
