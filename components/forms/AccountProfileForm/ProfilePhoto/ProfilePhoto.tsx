import React from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, set } from "react-hook-form";
import { UserSchemaType } from "../accountProfile.schema";
import { AppAvatar } from "@/components/shared/AppAvatar/AppAvatar";
import AccountProfileFormStyles from "../AccountProfileForm.module.css";

interface ProfilePhotoProps {
	control: Control<UserSchemaType>;
	setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const ProfilePhoto = ({ control, setFiles }: ProfilePhotoProps) => {
	const handleImage = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			setFiles(Array.from(e.target.files));

			if (!file.type.includes("image")) return;

			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				if (fileReader.result) {
					fieldChange(fileReader.result.toString());
				}
			};
		}
	};

	return (
		<FormField
			control={control}
			name="profile_photo"
			render={({ field }) => (
				<FormItem className="flex items-center gap-4">
					<FormLabel
						className={AccountProfileFormStyles.AccountForm_ImageLabel}
					>
						{field.value ? (
							<AppAvatar src={field.value} width={96} height={96} />
						) : (
							<AppAvatar src="/assets/profile.svg" width={24} height={24} />
						)}
					</FormLabel>

					<FormControl className="flex-1 text-base-semibold text-gray-200">
						<Input
							type="file"
							accept="image/*"
							placeholder="Upload a photo"
							className={AccountProfileFormStyles.AccountForm_ImageInput}
							onChange={(e) => handleImage(e, field.onChange)}
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
