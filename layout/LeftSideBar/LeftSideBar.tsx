import React from "react";
import { LogoutButton, SidebarLinksList } from "../components";

export const LeftSideBar = () => {
	return (
		<section className="custom-scrollbar leftsidebar">
			<div className="flex w-full flex-1 flex-col gap-6 px-6">
				<SidebarLinksList place="sidebar" />
			</div>

			<div className="mt-10 px-6">
				<LogoutButton place="sidebar" />
			</div>
		</section>
	);
};
