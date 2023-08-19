"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { getSideBarLinks } from "./sidebarLinks";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

interface SidebarLinksListProps {
	place: "sidebar" | "bottomBar";
}

export const SidebarLinksList = ({ place }: SidebarLinksListProps) => {
	const pathname = usePathname();
	const { userId } = useAuth();

	return (
		<>
			{getSideBarLinks(userId || "").map(({ imgURL, label, route }) => {
				const isActive =
					(pathname.includes(route) && route.length > 1) || pathname === route;

				return (
					<Link
						key={label}
						href={route}
						className={`
							${place === "sidebar" ? "leftsidebar_link" : "bottombar_link"}
							${isActive ? "bg-primary-500" : ""}
						`}
					>
						<Image src={imgURL} alt={label} width={24} height={24} />

						{place === "sidebar" && (
							<p className="text-light-1 max-lg:hidden">{label}</p>
						)}

						{place === "bottomBar" && (
							<p className="text-subtle-medium text-light-1 max-sm:hidden">
								{label.split(/\s+/)[0]}
							</p>
						)}
					</Link>
				);
			})}
		</>
	);
};
