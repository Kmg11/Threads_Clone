import { UserType } from "@/types";
import Image from "next/image";
import React from "react";
import { AppAvatar } from "../AppAvatar/AppAvatar";
import Link from "next/link";
import { ROUTES } from "@/constants";

interface ProfileHeaderProps {
	authUserId: string;
	accountId: string;
	name: UserType["name"];
	username: UserType["username"];
	image: UserType["image"];
	bio: UserType["bio"];
	type?: "user" | "community";
}

export const ProfileHeader = ({
	authUserId,
	accountId,
	bio,
	image,
	name,
	username,
	type,
}: ProfileHeaderProps) => {
	return (
		<div className="flex w-full flex-col justify-start">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div>
						<AppAvatar
							src={image}
							width={80}
							height={80}
							name={name}
							className="shadow-2xl"
						/>
					</div>

					<div className="flex-1">
						<h2 className="text-left text-heading3-bold text-light-1">
							{name}
						</h2>
						<p className="text-base-medium text-gray-1">@{username}</p>
					</div>
				</div>

				{accountId === authUserId && type !== "community" && (
					<Link href={ROUTES.PROFILE.EDIT}>
						<div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
							<Image
								src="/assets/edit.svg"
								alt="logout"
								width={16}
								height={16}
							/>

							<p className="text-light-2 max-sm:hidden">Edit</p>
						</div>
					</Link>
				)}
			</div>

			{bio && (
				<p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
			)}

			<div className="mt-6 h-0.5 w-full bg-dark-3" />
		</div>
	);
};
