import * as zod from "zod";

export const PostThreadSchema = zod.object({
	thread: zod
		.string({
			required_error: "Thread is required",
			invalid_type_error: "Thread must be a string",
			description: "Thread",
		})
		.min(1, { message: "Thread must be at least 1 character long" })
		.nonempty({ message: "Thread must not be empty" }),

	accountId: zod.string({
		required_error: "Account ID is required",
		invalid_type_error: "Account ID must be a string",
		description: "Account ID",
	}),
});

export type PostThreadSchemaType = zod.infer<typeof PostThreadSchema>;
