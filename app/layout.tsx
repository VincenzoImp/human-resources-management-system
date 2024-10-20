import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
	title: "IWN",
	description: "IWN app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
	<html lang="it">
		<body className="justify-center items-center flex h-screen w-screen">
			<Providers>
				{children}
			</Providers>
		</body>
	</html>
  );
}
