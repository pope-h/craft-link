import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, eduChainTestnet } from 'wagmi/chains'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, eduChainTestnet]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig