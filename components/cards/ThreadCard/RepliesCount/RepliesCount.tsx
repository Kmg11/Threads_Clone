import React from "react";
import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import { ROUTES } from "@/constants";
import { ThreadType } from "@/types";
import Link from "next/link";

interface RepliesCountProps {
	_id: ThreadType["_id"];
	comments: ThreadType["comments"];
}

export const RepliesCount = ({ _id, comments }: RepliesCountProps) => {
	const uniqueComments = comments.filter(
		(comment, index, self) =>
			index === self.findIndex((c) => c.author.id === comment.author.id)
	);

	return (
		<div className="ml-1 mt-3 flex items-center gap-2">
			{uniqueComments.slice(0, 2).map((comment, index) => (
				<AppAvatar
					key={index}
					src={comment.author.image}
					width={24}
					height={24}
					className={`${index !== 0 && "-ml-5"}`}
				/>
			))}

			<Link href={ROUTES.THREAD(_id)}>
				<p className="mt-1 text-subtle-medium text-gray-1">
					{comments.length} repl{comments.length > 1 ? "ies" : "y"}
				</p>
			</Link>
		</div>
	);
};
