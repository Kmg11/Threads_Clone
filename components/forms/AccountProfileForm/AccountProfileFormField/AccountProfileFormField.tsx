import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserValidationType } from "@/lib";
import React from "react";
import { Control, FieldName } from "react-hook-form";

interface AccountProfileFormFieldProps {
	control: Control<UserValidationType>;
	name: FieldName<UserValidationType>;
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
								className="account-form_input no-focus"
								{...field}
							/>
						) : (
							<Textarea
								rows={2}
								className="account-form_input no-focus"
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
