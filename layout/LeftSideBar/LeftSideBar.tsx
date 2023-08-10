"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { sideBarLinks } from "@/constants";

export const LeftSideBar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const goToSignin = () => router.push("/sign-in");

	return (
		<section className="custom-scrollbar leftsidebar">
			<div className="flex w-full flex-1 flex-col gap-6 px-6">
				{sideBarLinks.map(({ imgURL, label, route }) => {
					const isActive =
						(pathname.includes(route) && route.length > 1) ||
						pathname === route;

					return (
						<Link
							key={label}
							href={route}
							className={`leftsidebar_link ${isActive ? "bg-primary-500" : ""}`}
						>
							<Image src={imgURL} alt={label} width={24} height={24} />

							<p className="text-light-1 max-lg:hidden">{label}</p>
						</Link>
					);
				})}
			</div>

			<div className="mt-10 px-6">
				<SignedIn>
					<SignOutButton signOutCallback={goToSignin}>
						<div className="flex cursor-pointer gap-4 p-4">
							<Image
								src="/assets/logout.svg"
								alt="logout"
								width={24}
								height={24}
							/>

							<p className="text-light-2 max-lg:hidden">Logout</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</section>
	);
};
