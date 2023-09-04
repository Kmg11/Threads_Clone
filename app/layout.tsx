import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Threads",
		template: "%s | Threads",
	},
	description: "Threads App",
	creator: "Kirolos Mahfouz",
	keywords: [
		"threads",
		"app",
		"social",
		"media",
		"social media",
		"Next.js",
		"React",
		"TypeScript",
		"Tailwind CSS",
		"Clerk",
		"Node.js",
		"MongoDB",
	],
	themeColor: "#000000",
};

const interFont = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<ClerkProvider appearance={{ baseTheme: dark }}>
			<html lang="en">
				<body className={interFont.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
