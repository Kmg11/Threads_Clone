import * as zod from "zod";

export const CreateCommentSchema = zod.object({
	thread: zod
		.string({
			required_error: "Thread is required",
			invalid_type_error: "Thread must be a string",
			description: "Thread",
		})
		.min(1, { message: "Thread must be at least 1 character long" })
		.nonempty({ message: "Thread must not be empty" }),
});

export type CreateCommentSchemaType = zod.infer<typeof CreateCommentSchema>;
