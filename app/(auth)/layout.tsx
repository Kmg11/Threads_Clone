export const metadata = {
	title: "Auth | Threads",
	description: "Auth page for Threads",
};

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="bg-dark-1 min-h-screen w-full flex justify-center items-center p-5">
			{children}
		</div>
	);
}
