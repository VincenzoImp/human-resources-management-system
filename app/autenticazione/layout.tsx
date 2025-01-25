"use client";

import { Unauthenticated } from "@/app/modifiers";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Unauthenticated>
            {children}
        </Unauthenticated>
    );
  }
  