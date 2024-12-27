import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ContextProvider } from "./context";
import { Toast } from "./components/toast";

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
