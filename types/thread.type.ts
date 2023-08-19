import mongoose from "mongoose";

interface AuthorType {
	_id: mongoose.Types.ObjectId;
	image: string;
	name: string;
	username: string;
}

export interface ThreadDocumentType {
	_id: mongoose.Types.ObjectId;
	text: string;
	author: mongoose.Types.ObjectId;
	parentId: mongoose.Types.ObjectId | null;
	community: mongoose.Types.ObjectId | null;
	comments: string[];
	createdAt: string;
	updatedAt: string;
}

export interface ThreadType
	extends Omit<ThreadDocumentType, "author" | "comments"> {
	author: AuthorType;
	comments: ThreadType[];
}
