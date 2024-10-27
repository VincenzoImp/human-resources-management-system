import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ContextProvider } from "./context";

export const metadata: Metadata = {
	title: "IWN",
	description: "IWN app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
	<html lang="it">
		<body className="justify-center items-center flex h-screen w-screen">
			<Providers>
				<ContextProvider>
					{children}
				</ContextProvider>
			</Providers>
		</body>
	</html>
  );
}
