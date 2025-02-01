"use client";

import { HeroUIProvider } from "@heroui/react"
import { ThemeProvider  } from "next-themes"

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<HeroUIProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				themes={["light", "dark"]}
			>
				{children}
			</ThemeProvider>
		</HeroUIProvider>
	)
}