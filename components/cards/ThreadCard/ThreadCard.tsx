import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import { ROUTES } from "@/constants";
import { ThreadType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { DeleteThread } from "./DeleteThread/DeleteThread";
import { RepliesCount } from "./RepliesCount/RepliesCount";
import { Community } from "./Community/Community";

interface ThreadCardProps extends ThreadType {
	currentUserId: string;
	isComment?: boolean;
}

export const ThreadCard = ({
	_id,
	currentUserId,
	text: content,
	author,
	comments,
	community,
	createdAt,
	parentId,
	isComment,
}: ThreadCardProps) => {
	return (
		<article
			className={`
				flex w-full flex-col rounded-xl
				${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"}
			`}
		>
			<div className="flex items-start justify-between">
				<div className="flex w-full flex-1 flex-row gap-4">
					<div className="flex flex-col items-center">
						<Link href={ROUTES.PROFILE.USER_PROFILE(currentUserId)}>
							<AppAvatar
								src={author.image}
								width={44}
								height={44}
								name={author.name}
							/>
						</Link>

						<div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
					</div>

					<div className="flex w-full flex-col">
						<Link
							href={ROUTES.PROFILE.USER_PROFILE(currentUserId)}
							className="w-fit"
						>
							<h3 className="cursor-pointer text-base-semibold text-light-1">
								{author.name}
							</h3>
						</Link>

						<p className="mt-2 text-small-regular text-light-2">{content}</p>

						<div className={`mt-5 flex flex-col gap-3 ${isComment && "mb-10"}`}>
							<div className="flex gap-3.5">
								<Link href={ROUTES.THREAD(_id)}>
									<Image
										src="/assets/reply.svg"
										alt="reply"
										width={24}
										height={24}
										className="cursor-pointer object-contain"
									/>
								</Link>
							</div>

							{isComment && comments.length > 0 && (
								<Link href={ROUTES.THREAD(_id)}>
									<p className="mt-1 text-subtle-medium text-gray-1">
										{comments.length} replies
									</p>
								</Link>
							)}
						</div>
					</div>
				</div>

				<DeleteThread
					threadId={_id}
					currentUserId={currentUserId}
					authorId={author.id}
					parentId={parentId}
					isComment={isComment}
				/>
			</div>

			{!isComment && comments.length > 0 && (
				<RepliesCount _id={_id} comments={comments} />
			)}

			{!isComment && community && (
				<Community community={community} createdAt={createdAt} />
			)}
		</article>
	);
};
