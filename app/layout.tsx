import type { Metadata } from "next";
import "@/app/globals.css";
import Providers from "@/app/providers";
import { ContextProvider } from "@/app/context";
import { Toast } from "@/app/components/toast";

export const metadata: Metadata = {
	title: "IWN",
	description: "IWN app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
	<html lang="en">
		<body>
			<Providers>
				<ContextProvider>
					<Toast />
					{children}
				</ContextProvider>
			</Providers>
		</body>
	</html>
  );
}
