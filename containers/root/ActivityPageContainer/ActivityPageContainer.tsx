import React from "react";
import Link from "next/link";
import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import { ROUTES } from "@/constants";
import { getActivitiesAction } from "@/server/actions/userActions/getActivitiesAction.action";
import { UserType } from "@/types";

interface ActivityPageContainerProps {
	userInfo: UserType;
}

export const ActivityPageContainer = async ({
	userInfo,
}: ActivityPageContainerProps) => {
	const { activities } = await getActivitiesAction(userInfo._id);

	return (
		<section>
			<h1 className="head-text mb-10">Activity</h1>

			<section className="mt-10 flex flex-col gap-5">
				{activities.length > 0 ? (
					activities.map((activity) => (
						<Link
							key={activity._id.toString()}
							href={ROUTES.THREAD(activity.parentId || "")}
						>
							<article className="flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4">
								<AppAvatar
									src={activity.author.image}
									width={20}
									height={20}
									name={activity.author.name}
								/>

								<p className="!text-small-regular text-light-1">
									<span className="mr-1 text-primary-500">
										{activity.author.name}{" "}
									</span>
									replied to your thread
								</p>
							</article>
						</Link>
					))
				) : (
					<p className="!text-base-regular text-light-3">No activity</p>
				)}
			</section>
		</section>
	);
};
