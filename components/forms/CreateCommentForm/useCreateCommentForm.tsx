import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import {
	CreateCommentSchema,
	CreateCommentSchemaType,
} from "./createComment.schema";
import { addCommentToThreadAction } from "@/server/actions/threadActions/addCommentToThread.action";
import { CreateCommentFormProps } from "./CreateCommentForm";

interface UseCreateCommentFormProps {
	threadId: CreateCommentFormProps["threadId"];
	currentUserId: CreateCommentFormProps["currentUserId"];
}

export const useCreateCommentForm = ({
	threadId,
	currentUserId,
}: UseCreateCommentFormProps) => {
	const pathname = usePathname();

	const form = useForm<CreateCommentSchemaType>({
		resolver: zodResolver(CreateCommentSchema),
		defaultValues: { thread: "" },
	});

	const onSubmit = async (values: CreateCommentSchemaType) => {
		await addCommentToThreadAction({
			commentText: values.thread,
			threadId: threadId,
			userId: currentUserId,
			path: pathname,
		});

		form.reset();
	};

	return { form, onSubmit };
};
