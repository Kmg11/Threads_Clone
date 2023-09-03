"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteThreadAction } from "@/server/actions/threadActions/deleteThread.action";
import { ThreadType, UserType } from "@/types";

interface DeleteThreadProps {
	threadId: ThreadType["_id"];
	currentUserId: string;
	authorId: UserType["id"];
	parentId: ThreadType["parentId"];
	isComment?: boolean;
}

export function DeleteThread({
	threadId,
	currentUserId,
	authorId,
	parentId,
	isComment,
}: DeleteThreadProps) {
	const pathname = usePathname();
	const router = useRouter();

	if (currentUserId !== authorId || pathname === "/") return null;

	const handleDeleteThread = async () => {
		await deleteThreadAction(threadId, pathname);

		if (!parentId || !isComment) {
			router.push("/");
		}
	};

	return (
		<Image
			src="/assets/delete.svg"
			alt="delete thread icon"
			width={18}
			height={18}
			className="cursor-pointer object-contain"
			onClick={handleDeleteThread}
		/>
	);
}
