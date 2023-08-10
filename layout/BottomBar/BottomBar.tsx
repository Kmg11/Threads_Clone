import React from "react";
import { SidebarLinksList } from "../components";

export const BottomBar = () => {
	return (
		<section className="bottombar">
			<div className="bottombar_container">
				<SidebarLinksList place="bottomBar" />
			</div>
		</section>
	);
};
