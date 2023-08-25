"use client";

import React from "react";
import { Types } from "mongoose";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCommentForm } from "./useCreateCommentForm";
import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import CreateCommentFormStyles from "./CreateCommentForm.module.css";

export interface CreateCommentFormProps {
	threadId: Types.ObjectId;
	currentUserImg: string;
	currentUserId: Types.ObjectId;
	currentUserName: string;
}

export const CreateCommentForm = ({
	threadId,
	currentUserId,
	currentUserImg,
	currentUserName,
}: CreateCommentFormProps) => {
	const { form, onSubmit } = useCreateCommentForm({ currentUserId, threadId });

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={CreateCommentFormStyles.CommentForm}
			>
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex items-center gap-3 w-full">
							<FormLabel>
								<AppAvatar
									src={currentUserImg}
									width={48}
									height={48}
									name={currentUserName}
								/>
							</FormLabel>

							<FormControl className="border-none bg-transparent">
								<Input
									type="text"
									placeholder="Comment..."
									className="no-focus text-light-1 outline-none"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className={CreateCommentFormStyles.CommentFormBtn}
				>
					Reply
				</Button>
			</form>
		</Form>
	);
};
