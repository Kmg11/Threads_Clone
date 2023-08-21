import { ROUTES } from "@/constants";
import { getActivitiesAction } from "@/server/actions/userActions/getActivitiesAction.action";
import { getUserAction } from "@/server/actions/userActions/getUser.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function ActivityPage() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await getUserAction(user.id);
	if (!userInfo?.onboarded) return redirect(ROUTES.AUTH.ONBOARDING);

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
								<Image
									src={activity.author.image || ""}
									alt="Profile Picture"
									width={20}
									height={20}
									className="rounded-full object-cover"
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
