import mongoose from "mongoose";
import { AuthorType, CommunityType } from ".";

export interface ThreadDocumentType {
	_id: mongoose.Types.ObjectId;
	text: string;
	author: mongoose.Types.ObjectId;
	parentId: mongoose.Types.ObjectId | null;
	community: any | null;
	comments: string[];
	createdAt: string;
	updatedAt: string;
}

export interface ThreadType
	extends Omit<ThreadDocumentType, "author" | "comments" | "community"> {
	author: AuthorType;
	comments: ThreadType[];
	community: CommunityType;
}
