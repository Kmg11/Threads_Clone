import { BottomBar, LeftSideBar, RightSideBar, TopBar } from "@/layout";

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<TopBar />

			<main className="flex flex-row">
				<LeftSideBar />

				<section className="main-container">
					<div className="w-full max-w-4xl">{children}</div>
				</section>

				<RightSideBar />
			</main>

			<BottomBar />
		</>
	);
}
