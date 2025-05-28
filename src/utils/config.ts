// import { http, createConfig } from 'wagmi';
// import { baseSepolia } from 'wagmi/chains';
// import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

// const projectId = import.meta.env.VITE_WALLET_CONNECT_ID;

// export const config = createConfig({
//   chains: [baseSepolia],
//   connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
//   transports: {
//     [baseSepolia.id]: http(),
//   },
// });

import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [metaMask()],
  transports: {
    [baseSepolia.id]: http(),
  },
});
