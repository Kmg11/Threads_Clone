"use client";

import React from "react";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import Image from "next/image";

interface LogoutButtonProps {
	place: "sidebar" | "topBar";
}

export const LogoutButton = ({ place }: LogoutButtonProps) => {
	const router = useRouter();
	const goToSignin = () => router.push(ROUTES.AUTH.SIGNIN);

	return (
		<SignedIn>
			<SignOutButton signOutCallback={goToSignin}>
				<div
					className={`
						flex cursor-pointer
						${place === "sidebar" ? "gap-4 p-4" : ""}
					`}
				>
					<Image src="/assets/logout.svg" alt="logout" width={24} height={24} />

					{place === "sidebar" && (
						<p className="text-light-2 max-lg:hidden">Logout</p>
					)}
				</div>
			</SignOutButton>
		</SignedIn>
	);
};
