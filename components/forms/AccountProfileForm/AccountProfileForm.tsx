"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProfilePhoto } from "./ProfilePhoto/ProfilePhoto";
import { AccountProfileFormField } from "./AccountProfileFormField/AccountProfileFormField";
import { useAccountProfileForm } from "./useAccountProfileForm";

export interface AccountProfileFormProps {
	user: {
		id: string;
		objectId: string;
		username: string | null;
		name: string;
		bio: string;
		image: string;
	};
	btnTitle: string;
}

export const AccountProfileForm = ({
	btnTitle,
	user,
}: AccountProfileFormProps) => {
	const { form, onSubmit, setFiles } = useAccountProfileForm({ user });

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-start gap-10"
			>
				<ProfilePhoto control={form.control} setFiles={setFiles} />

				<AccountProfileFormField
					control={form.control}
					name="name"
					label="Name"
					variant="text"
				/>

				<AccountProfileFormField
					control={form.control}
					name="username"
					label="Username"
					variant="text"
				/>

				<AccountProfileFormField
					control={form.control}
					name="bio"
					label="Bio"
					variant="textarea"
				/>

				<Button type="submit" className="bg-primary-500">
					{btnTitle}
				</Button>
			</form>
		</Form>
	);
};