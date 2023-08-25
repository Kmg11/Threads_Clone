"use client";

import React from "react";
import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { UserType } from "@/types";
import { useRouter } from "next/navigation";
import UserCardStyles from "./UserCard.module.css";

interface UserCardProps {
	id: UserType["id"];
	name: UserType["name"];
	username: UserType["username"];
	image: UserType["image"];
	type: "user" | "community";
}

export const UserCard = ({
	id,
	name,
	username,
	image,
	type,
}: UserCardProps) => {
	const router = useRouter();
	const isCommunity = type === "community";

	const handleGoToProfile = () => {
		if (isCommunity) {
			router.push(ROUTES.COMMUNITY(id));
		} else {
			router.push(ROUTES.PROFILE.USER_PROFILE(id));
		}
	};

	return (
		<article className={UserCardStyles.UserCard}>
			<div className={UserCardStyles.UserCardAvatar}>
				<AppAvatar src={image} width={48} height={48} name={name} />

				<div className="flex-1 text-ellipsis">
					<h4 className="text-base-semibold text-light-1">{name}</h4>
					<p className="text-small-medium text-gray-1">@{username}</p>
				</div>
			</div>

			<Button
				className={UserCardStyles.UserCardBtn}
				onClick={handleGoToProfile}
			>
				View
			</Button>
		</article>
	);
};
