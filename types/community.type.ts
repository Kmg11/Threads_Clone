import mongoose from "mongoose";
import { AuthorType, UserType } from ".";

export interface CommunityDocumentType {
	_id: mongoose.Types.ObjectId;
	id: string;
	username: string;
	name: string;
	image?: string;
	bio?: string;
	threads: mongoose.Types.ObjectId[];
	members: mongoose.Types.ObjectId[];
	createdBy: mongoose.Types.ObjectId;
	createdAt: string;
	updatedAt: string;
}

export interface CommunityType
	extends Omit<CommunityDocumentType, "members" | "createdBy"> {
	members: AuthorType[];
	createdBy: AuthorType;
}

export type PopulateCommunityType = Pick<
	CommunityType,
	"_id" | "image" | "name" | "username"
>;
