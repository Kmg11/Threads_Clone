import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import { ROUTES } from "@/constants";
import { formatDateString } from "@/lib";
import { ThreadType } from "@/types";
import Image from "next/image";
import Link from "next/link";

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

						<div className="thread-card_bar" />
					</div>

					<div className="flex w-full flex-col">
						<Link
							href={ROUTES.PROFILE.USER_PROFILE(currentUserId)}
							className="w-fit"
						>
							<h4 className="cursor-pointer text-base-semibold text-light-1">
								{author.name}
							</h4>
						</Link>

						<p className="mt-2 text-small-regular text-light-2">{content}</p>

						<div className={`mt-5 flex flex-col gap-3 ${isComment && "mb-10"}`}>
							<div className="flex gap-3.5">
								<Image
									src="/assets/heart-gray.svg"
									alt="heart"
									width={24}
									height={24}
									className="cursor-pointer object-contain"
								/>

								<Link href={ROUTES.THREAD(_id)}>
									<Image
										src="/assets/reply.svg"
										alt="reply"
										width={24}
										height={24}
										className="cursor-pointer object-contain"
									/>
								</Link>

								<Image
									src="/assets/repost.svg"
									alt="repost"
									width={24}
									height={24}
									className="cursor-pointer object-contain"
								/>

								<Image
									src="/assets/share.svg"
									alt="share"
									width={24}
									height={24}
									className="cursor-pointer object-contain"
								/>
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

				{/* TODO: Delete Thread */}
				{/* TODO: Show replies count */}
			</div>

			{!isComment && community && (
				<Link
					href={ROUTES.COMMUNITY(community.id)}
					className="mt-5 flex items-center"
				>
					<p className="text-subtle-medium text-gray-1">
						{formatDateString(createdAt)} - {community.name} Community
					</p>

					<AppAvatar
						src={community.image}
						width={14}
						height={14}
						name={community.name}
						className="ms-1"
					/>
				</Link>
			)}
		</article>
	);
};
