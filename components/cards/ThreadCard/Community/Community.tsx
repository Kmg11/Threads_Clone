import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import { ROUTES } from "@/constants";
import { formatDateString } from "@/lib";
import { CommunityType, ThreadType } from "@/types";
import Link from "next/link";

interface CommunityProps {
	community: CommunityType;
	createdAt: ThreadType["createdAt"];
}

export const Community = ({ community, createdAt }: CommunityProps) => {
	return (
		<Link
			href={ROUTES.COMMUNITY(community.id)}
			className="mt-5"
		>
			<p className="text-subtle-medium text-gray-1 inline align-middle">
				{formatDateString(createdAt)} - {community.name} Community
			</p>

			<AppAvatar
				src={community.image}
				width={14}
				height={14}
				name={community.name}
				className="inline-block ms-1 align-middle"
			/>
		</Link>
	);
};
