import React from "react";
import { SidebarLinksList } from "../components";
import LeftSidebarStyles from "./LeftSideBar.module.css";

export const LeftSideBar = () => {
	return (
		<section className={`custom-scrollbar ${LeftSidebarStyles.LeftSidebar}`}>
			<div className="flex w-full flex-1 flex-col gap-6 px-6">
				<SidebarLinksList place="sidebar" />
			</div>
		</section>
	);
};
