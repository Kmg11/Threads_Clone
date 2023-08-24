"use client";

import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { UserType } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

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

	return (
		<article className="user-card">
			<div className="user-card_avatar">
				<AppAvatar src={image} width={48} height={48} name={name} />

				<div className="flex-1 text-ellipsis">
					<h4 className="text-base-semibold text-light-1">{name}</h4>
					<p className="text-small-medium text-gray-1">@{username}</p>
				</div>
			</div>

			<Button
				className="user-card_btn"
				onClick={() => router.push(ROUTES.PROFILE.USER_PROFILE(id))}
			>
				View
			</Button>
		</article>
	);
};
