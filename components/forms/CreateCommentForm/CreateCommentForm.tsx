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
import Image from "next/image";

export interface CreateCommentFormProps {
	threadId: Types.ObjectId;
	currentUserImg: string;
	currentUserId: Types.ObjectId;
}

export const CreateCommentForm = ({
	threadId,
	currentUserId,
	currentUserImg,
}: CreateCommentFormProps) => {
	const { form, onSubmit } = useCreateCommentForm({ currentUserId, threadId });

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex items-center gap-3 w-full">
							<FormLabel>
								<Image
									src={currentUserImg}
									alt="current user image"
									width={48}
									height={48}
									className="rounded-full object-cover"
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

				<Button type="submit" className="comment-form_btn">
					Reply
				</Button>
			</form>
		</Form>
	);
};
