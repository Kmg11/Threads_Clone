import { isBase64Image } from "@/lib";
import { UserSchemaType, UserSchema } from "./accountProfile.schema";
import { useUploadThing } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AccountProfileFormProps } from "./AccountProfileForm";
import { updateUserAction } from "@/server/actions/userActions/updateUser.action";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

interface UseAccountProfileFormProps {
	user: AccountProfileFormProps["user"];
}

export const useAccountProfileForm = ({ user }: UseAccountProfileFormProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing("media");

	const form = useForm<UserSchemaType>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			profile_photo: user.image,
			name: user.name,
			username: user.username,
			bio: user.bio,
		},
	});

	const onSubmit = async (values: UserSchemaType) => {
		if (isBase64Image(values.profile_photo)) {
			const imgRes = await startUpload(files);

			if (imgRes && imgRes[0].url) {
				values.profile_photo = imgRes[0].url;
			}
		}

		await updateUserAction({
			userId: user.id,
			image: values.profile_photo,
			name: values.name,
			username: values.username,
			bio: values.bio,
			path: pathname,
		});

		if (pathname === ROUTES.AUTH.ONBOARDING) router.push(ROUTES.HOME);
		if (pathname === ROUTES.PROFILE.EDIT) router.back();
	};

	return { form, onSubmit, setFiles };
};
