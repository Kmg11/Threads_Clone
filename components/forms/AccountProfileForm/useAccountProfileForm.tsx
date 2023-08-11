import { UserValidationType, isBase64Image, userValidation } from "@/lib";
import { useUploadThing } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AccountProfileFormProps } from "./AccountProfileForm";

interface UseAccountProfileFormProps {
	user: AccountProfileFormProps["user"];
}

export const useAccountProfileForm = ({ user }: UseAccountProfileFormProps) => {
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing("media");

	const form = useForm({
		resolver: zodResolver(userValidation),
		defaultValues: {
			profile_photo: user.image,
			name: user.name,
			username: user.username,
			bio: user.bio,
		},
	});

	const onSubmit = async (values: UserValidationType) => {
		if (isBase64Image(values.profile_photo)) {
			const imgRes = await startUpload(files);

			if (imgRes && imgRes[0].url) {
				values.profile_photo = imgRes[0].url;
			}
		}

		// TODO: update user profile
	};

	return { form, onSubmit, setFiles };
};
