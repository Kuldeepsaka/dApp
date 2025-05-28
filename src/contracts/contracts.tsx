import stableCoinAbi from '../contracts/ABI/abi.json';
import type { Abi } from 'viem'; // ✅ Add this line

interface Contract {
    TYPE: string;
    ADDRESS: string;
    ABI: Abi | readonly unknown[] | undefined;
}

export const CONTRACT_ARRAY: Contract[] = [
    {
        TYPE: 'FUND_CONTRACT',
        ADDRESS: import.meta.env.VITE_APP_USDT,
        ABI: stableCoinAbi,
    },
];
