import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ARRAY } from '../../contracts/contracts';
import { formatUnits } from 'viem/utils';
import type { Abi } from 'viem';

export function TokenBalance() {
    const { address } = useAccount();



    const stableCoinContract = CONTRACT_ARRAY.find(
        (c) => c.TYPE === 'FUND_CONTRACT'
    );

    const contractAddress = stableCoinContract?.ADDRESS as `0x${string}`;
    const contractAbi = stableCoinContract?.ABI as Abi;

    const {
        data: balanceRaw,
        isLoading: loadingBalance,
        error: balanceError,
    } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'balanceOf',
        args: [address],
    });

    const {
        data: decimalsRaw,
        isLoading: loadingDecimals,
        error: decimalsError,
    } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'decimals',
    });

    if (!contractAddress || !contractAbi) {
        return <p>Missing contract configuration.</p>;
    }

    if (loadingBalance || loadingDecimals) return <p>Loading balance...</p>;

    if (balanceError || decimalsError) {
        return (
            <p className="text-danger">
                Please Connect Wallet for Get Token Balance
            </p>
        );
    }

    // ✅ Ensure correct types
    const balance = balanceRaw as bigint;
    const decimals = decimalsRaw as number;

    const formatted = formatUnits(balance ?? 0n, decimals ?? 18);

    return <div className='my-3'><span className='small'><b>Token Balance:</b> {formatted} TOKEN</span></div>;
}
