import React from "react";
import Image from "next/image";
import Link from "next/link";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import TopBarStyles from "./TopBar.module.css";

export const TopBar = () => {
	return (
		<nav className={TopBarStyles.TopBar}>
			<Link href="/" className="flex items-center gap-4">
				<Image src="/assets/logo.svg" alt="logo" width={28} height={28} />

				<p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
			</Link>

			<div className="flex items-center gap-1">
				<OrganizationSwitcher
					appearance={{
						elements: {
							organizationSwitcherTrigger: "py-2 px-4",
						},
					}}
				/>

				<UserButton />
			</div>
		</nav>
	);
};
