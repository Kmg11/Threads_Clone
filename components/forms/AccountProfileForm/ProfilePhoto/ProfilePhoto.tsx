import React from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserValidationType } from "@/lib";
import Image from "next/image";
import { Control, set } from "react-hook-form";

interface ProfilePhotoProps {
	control: Control<UserValidationType>;
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
					<FormLabel className="account-form_image-label">
						{field.value ? (
							<Image
								src={field.value}
								alt="profile photo"
								width={96}
								height={96}
								priority
								className="rounded-full object-contain"
							/>
						) : (
							<Image
								src="/assets/profile.svg"
								alt="profile photo"
								width={24}
								height={24}
								className="object-contain"
							/>
						)}
					</FormLabel>

					<FormControl className="flex-1 text-base-semibold text-gray-200">
						<Input
							type="file"
							accept="image/*"
							placeholder="Upload a photo"
							className="account-form_image-input"
							onChange={(e) => handleImage(e, field.onChange)}
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
