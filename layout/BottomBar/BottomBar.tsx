import React from "react";
import { SidebarLinksList } from "../components";
import BottomBarStyles from "./BottomBar.module.css";

export const BottomBar = () => {
	return (
		<section className={BottomBarStyles.BottomBar}>
			<div className={BottomBarStyles.BottomBar_Container}>
				<SidebarLinksList place="bottomBar" />
			</div>
		</section>
	);
};
