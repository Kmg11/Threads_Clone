"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const TopBar = () => {
	const router = useRouter();
	const goToSignin = () => router.push("/sign-in");

	return (
		<nav className="topbar">
			<Link href="/" className="flex items-center gap-4">
				<Image src="/assets/logo.svg" alt="logo" width={28} height={28} />

				<p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
			</Link>

			<div className="flex items-center gap-1">
				<div className="block md:hidden">
					<SignedIn>
						<SignOutButton signOutCallback={goToSignin}>
							<div className="flex cursor-pointer">
								<Image
									src="/assets/logout.svg"
									alt="logout"
									width={24}
									height={24}
								/>
							</div>
						</SignOutButton>
					</SignedIn>
				</div>

				<OrganizationSwitcher
					appearance={{
						elements: {
							organizationSwitcherTrigger: "py-2 px-4",
						},
					}}
				/>
			</div>
		</nav>
	);
};
