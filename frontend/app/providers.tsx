"use client"

import TanstackProvider from "@/components/providers/tanstack-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
	return <TanstackProvider>{children}</TanstackProvider>
}
