import * as z from "zod";

export const UserSchema = z.object({
	profile_photo: z
		.string({
			required_error: "Profile photo is required",
			invalid_type_error: "Profile photo must be a string",
			description: "Profile photo",
		})
		.url({ message: "Profile photo must be a valid URL" })
		.nonempty({ message: "Profile photo must not be empty" }),

	name: z
		.string({
			required_error: "Name is required",
			invalid_type_error: "Name must be a string",
			description: "Name",
		})
		.min(3, { message: "Name must be at least 3 characters long" })
		.max(30, { message: "Name must be at most 30 characters long" })
		.nonempty({ message: "Name must not be empty" }),

	username: z
		.string({
			required_error: "Username is required",
			invalid_type_error: "Username must be a string",
			description: "Username",
		})
		.min(3, { message: "Username must be at least 3 characters long" })
		.max(30, { message: "Username must be at most 30 characters long" })
		.nonempty({ message: "Username must not be empty" }),

	bio: z
		.string({
			invalid_type_error: "Bio must be a string",
			description: "Bio",
		})
		.max(1000, { message: "Bio must be at most 1000 characters long" })
		.optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
