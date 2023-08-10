import React from "react";
import Image from "next/image";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LogoutButton } from "../components";

export const TopBar = () => {
	return (
		<nav className="topbar">
			<Link href="/" className="flex items-center gap-4">
				<Image src="/assets/logo.svg" alt="logo" width={28} height={28} />

				<p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
			</Link>

			<div className="flex items-center gap-1">
				<div className="block md:hidden">
					<LogoutButton place="topBar" />
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
