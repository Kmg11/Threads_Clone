import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import { AuthorType, CommunityType } from "@/types";

interface CommunityCardProps
	extends Pick<
		CommunityType,
		"id" | "name" | "username" | "image" | "bio" | "members"
	> {}

function CommunityCard({
	id,
	name,
	username,
	image,
	bio,
	members,
}: CommunityCardProps) {
	return (
		<article className="w-full rounded-lg bg-dark-3 px-4 py-5 md:w-96 xs:w-full">
			<div className="flex flex-wrap items-center gap-3">
				<Link href={`/communities/${id}`}>
					<AppAvatar src={image} width={48} height={48} name={name} />
				</Link>

				<div>
					<Link href={`/communities/${id}`}>
						<h4 className="text-base-semibold text-light-1">{name}</h4>
					</Link>
					<p className="text-small-medium text-gray-1">@{username}</p>
				</div>
			</div>

			<p className="mt-4 text-subtle-medium text-gray-1">{bio}</p>

			<div className="mt-5 flex flex-wrap items-center justify-between gap-3">
				<Link href={`/communities/${id}`}>
					<Button
						size="sm"
						className="rounded-lg bg-primary-500 px-5 py-1.5 text-small-regular !text-light-1"
					>
						View
					</Button>
				</Link>

				{members.length > 0 && (
					<div className="flex items-center">
						{members.map((member, index) => (
							<AppAvatar
								key={index}
								src={member.image}
								width={28}
								height={28}
								name={member.name}
								className={index !== 0 ? "-ml-2" : ""}
							/>
						))}

						{members.length > 3 && (
							<p className="ml-1 text-subtle-medium text-gray-1">
								{members.length}+ Users
							</p>
						)}
					</div>
				)}
			</div>
		</article>
	);
}

export default CommunityCard;
