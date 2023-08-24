import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";

interface Props {
	id: string;
	name: string;
	username: string;
	imgUrl: string;
	bio: string;
	members: {
		image: string;
		name: string;
	}[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
	return (
		<article className="community-card">
			<div className="flex flex-wrap items-center gap-3">
				<Link href={`/communities/${id}`}>
					<AppAvatar src={imgUrl} width={48} height={48} name={name} />
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
					<Button size="sm" className="community-card_btn">
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
