import { SignIn } from "@clerk/nextjs";

export const metadata = {
	title: "Sign In | Threads",
	description: "Sign in to Threads App",
};

export default function Page() {
	return <SignIn />;
}
