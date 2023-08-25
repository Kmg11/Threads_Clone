import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Control, FieldName } from "react-hook-form";
import { UserSchemaType } from "../accountProfile.schema";
import AccountProfileFormStyles from "../AccountProfileForm.module.css";

interface AccountProfileFormFieldProps {
	control: Control<UserSchemaType>;
	name: FieldName<UserSchemaType>;
	label: string;
	variant: "text" | "textarea";
}

export const AccountProfileFormField = ({
	control,
	name,
	label,
	variant,
}: AccountProfileFormFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col gap-3 w-full">
					<FormLabel className="text-base-semibold text-light-2">
						{label}
					</FormLabel>

					<FormControl>
						{variant === "text" ? (
							<Input
								type="text"
								className={`${AccountProfileFormStyles.AccountForm_Input} no-focus"`}
								{...field}
							/>
						) : (
							<Textarea
								rows={2}
								className={`${AccountProfileFormStyles.AccountForm_Input} no-focus"`}
								{...field}
							/>
						)}
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
