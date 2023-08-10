import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import "@/app/globals.css";

export const metadata = {
	title: "Threads",
	description: "Threads App",
};

const interFont = Inter({ subsets: ["latin"] });

interface MainLayoutProps {
	children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<ClerkProvider appearance={{ baseTheme: dark }}>
			<html lang="en">
				<body className={`${interFont.className} bg-dark-1`}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
