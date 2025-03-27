"use client";

import { wagmiAdapter, projectId } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { mainnet, sepolia } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "craftLink",
  description: "The Future of Decentralized Commerce",
  url: "https://craft-link.vercel.app/", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [sepolia], // [mainnet, arbitrum, avalanche, base, optimism, polygon]
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    "--w3m-accent": "#262208",
    "--w3m-color-mix": "#333333",
    "--w3m-color-mix-strength": 100,
  },
});

function ContextProvider({
  children,
  cookies,
}: Readonly<{ children: ReactNode; cookies: string | null }>) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
