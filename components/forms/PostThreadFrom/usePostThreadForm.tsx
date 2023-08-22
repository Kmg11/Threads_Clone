import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { PostThreadSchemaType, PostThreadSchema } from "./postThread.schema";
import { PostThreadFromProps } from "./PostThreadFrom";
import { createThreadAction } from "@/server/actions/threadActions/createThread.action";
import { ROUTES } from "@/constants";
import { useOrganization } from "@clerk/nextjs";

interface UsePostThreadFormProps {
	userId: PostThreadFromProps["userId"];
}

export const usePostThreadForm = ({ userId }: UsePostThreadFormProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const { organization } = useOrganization();

	const form = useForm<PostThreadSchemaType>({
		resolver: zodResolver(PostThreadSchema),
		defaultValues: { thread: "", accountId: JSON.stringify(userId) },
	});

	const onSubmit = async (values: PostThreadSchemaType) => {
		await createThreadAction({
			text: values.thread,
			author: userId,
			path: pathname,
			communityId: organization ? organization.id : null,
		});

		router.push(ROUTES.HOME);
	};

	return { form, onSubmit };
};
