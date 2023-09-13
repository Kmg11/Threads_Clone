"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import React from "react";
import { usePostThreadForm } from "./usePostThreadForm";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Types } from "mongoose";

export interface PostThreadFromProps {
	userId: Types.ObjectId;
}

export const PostThreadFrom = ({ userId }: PostThreadFromProps) => {
	const { form, onSubmit } = usePostThreadForm({ userId });

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-10 flex flex-col justify-start gap-10"
			>
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-3 w-full">
							<FormLabel className="text-base-semibold text-light-2">
								Content
							</FormLabel>

							<FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
								<Textarea rows={2} {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="bg-primary-500"
					disabled={form.formState.isSubmitting}
				>
					Post Thread
				</Button>
			</form>
		</Form>
	);
};
