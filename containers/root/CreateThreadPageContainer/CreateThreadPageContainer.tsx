import React from "react";
import { PostThreadFrom } from "@/components/forms/PostThreadFrom/PostThreadFrom";
import { UserType } from "@/types";

interface CreateThreadPageContainerProps {
	userInfo: UserType;
}

export const CreateThreadPageContainer = ({
	userInfo,
}: CreateThreadPageContainerProps) => {
	return (
		<>
			<h1 className="head-text">Create Thread</h1>

			<PostThreadFrom userId={userInfo._id} />
		</>
	);
};
