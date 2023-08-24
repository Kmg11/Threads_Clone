import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface AppAvatarProps {
	src: string | undefined;
	width: number;
	height: number;
	name?: string;
	className?: string;
}

export const AppAvatar = ({
	src,
	name,
	width,
	height,
	className,
}: AppAvatarProps) => {
	return (
		<Avatar
			className={`${className}`}
			style={{ width: `${width}px`, height: `${height}px` }}
		>
			<AvatarImage
				src={src}
				alt={`${name ? `${name} avatar image` : "avatar image"}`}
			/>

			{name && (
				<AvatarFallback className="uppercase bg-primary-500 text-light-1">
					{name
						.split(" ")
						.slice(0, 2)
						.map((word) => word[0])
						.join("")}
				</AvatarFallback>
			)}
		</Avatar>
	);
};
