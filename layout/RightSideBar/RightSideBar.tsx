import React from "react";
import RightSidebarStyles from "./RightSideBar.module.css";

export const RightSideBar = () => {
	return (
		<section className={`custom-scrollbar ${RightSidebarStyles.RightSidebar}`}>
			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-light-1">
					Suggested Communities
				</h3>
			</div>

			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
			</div>
		</section>
	);
};
