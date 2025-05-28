import { useState } from "react";
import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./utils/config";



export function Providers(props: {
    children: ReactNode,
}) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}