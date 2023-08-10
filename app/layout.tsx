import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Threads",
	description: "Threads App",
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
