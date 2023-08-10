"use client";

import { sideBarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const BottomBar = () => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<section className="bottombar">
			<div className="bottombar_container">
				{sideBarLinks.map(({ imgURL, label, route }) => {
					const isActive =
						(pathname.includes(route) && route.length > 1) ||
						pathname === route;

					return (
						<Link
							key={label}
							href={route}
							className={`bottombar_link ${isActive ? "bg-primary-500" : ""}`}
						>
							<Image src={imgURL} alt={label} width={24} height={24} />

							<p className="text-subtle-medium text-light-1 max-sm:hidden">
								{label.split(/\s+/)[0]}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
};
