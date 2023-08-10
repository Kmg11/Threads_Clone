import { SignUp } from "@clerk/nextjs";

export const metadata = {
	title: "Sign Up | Threads",
	description: "Sign up to Threads App",
};

export default function Page() {
	return <SignUp />;
}
