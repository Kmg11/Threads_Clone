"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";

interface SearchBarProps {
	routeType: "search" | "communities";
}

export function SearchBar({ routeType }: SearchBarProps) {
	const router = useRouter();
	const [search, setSearch] = useState("");

	// * Query after 0.3s of no input
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				router.push(`/${routeType}?search=` + search);
			} else {
				router.push(`/${routeType}`);
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [search, routeType, router]);

	return (
		<div className="flex gap-1 rounded-lg bg-dark-3 px-4 py-2">
			<Image
				src="/assets/search-gray.svg"
				alt="search"
				width={24}
				height={24}
				className="object-contain"
			/>

			<Input
				id="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder={`${
					routeType !== "search" ? "Search communities" : "Search users"
				}`}
				className="no-focus border-none bg-dark-3 text-base-regular !text-light-2 outline-none"
			/>
		</div>
	);
}
