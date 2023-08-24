import React from "react";
import Link from "next/link";
import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import { ROUTES } from "@/constants";
import { checkUser } from "@/lib/checkUser";
import { getActivitiesAction } from "@/server/actions/userActions/getActivitiesAction.action";

export default async function ActivityPage() {
	const { userInfo } = await checkUser();
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
							<article className="activity-card">
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
}
