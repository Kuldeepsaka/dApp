import { useState } from 'react';
import { useWriteContract, useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ARRAY } from '../../contracts/contracts';
import type { Abi } from 'viem';
import toast from 'react-hot-toast';

export function TokenActions() {
    const { address } = useAccount();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const stableCoinContract = CONTRACT_ARRAY.find(c => c.TYPE === 'FUND_CONTRACT');
    const contractAddress = stableCoinContract?.ADDRESS as `0x${string}` | undefined;
    const contractAbi = stableCoinContract?.ABI as Abi | undefined;

    const writeTransferHook = useWriteContract();
    const writeMintHook = useWriteContract();
    const writeBurnHook = useWriteContract();

    const { data: tokenSymbol, isLoading: isSymbolLoading, error: symbolError } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'symbol',
    }) as { data: string; isLoading: boolean; error: unknown };

    if (!contractAddress || !contractAbi) return <p>Missing contract configuration.</p>;

    const toBigInt = (amt: string) => {
        try {
            return BigInt(amt);
        } catch {
            return BigInt(0);
        }
    };

    const validateAmount = () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error('❌ Please enter a valid amount');
            return false;
        }
        return true;
    };

    const handleTransfer = async () => {
        if (!recipient || !validateAmount()) return toast.error('❌ Please fill all fields');
        try {
            await writeTransferHook.writeContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: 'transfer',
                args: [recipient, toBigInt(amount)],
            });
            toast.success('✅ Transfer Successful');
        } catch (error: unknown) {
            toast.error(`❌ Transfer Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleMint = async () => {
        if (!address) return toast.error('❌ Wallet not connected');
        if (!validateAmount()) return;
        try {
            await writeMintHook.writeContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: 'mint',
                args: [address, toBigInt(amount)],
            });
            toast.success('✅ Mint Successful');
        } catch (error: unknown) {
            toast.error(`❌ Mint Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleBurn = async () => {
        if (!address) return toast.error('❌ Wallet not connected');
        if (!validateAmount()) return;
        try {
            await writeBurnHook.writeContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: 'burn',
                args: [address, toBigInt(amount)],
            });
            toast.success('✅ Burn Successful');
        } catch (error: unknown) {
            toast.error(`❌ Burn Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const isBusy =
        writeTransferHook.status === 'pending' ||
        writeMintHook.status === 'pending' ||
        writeBurnHook.status === 'pending';

    return (
        <>
            <div className="mb-3 text-center">
                {isSymbolLoading ? (
                    <p>Loading token symbol...</p>
                ) : symbolError ? (
                    <p className="text-danger">Error loading symbol</p>
                ) : (
                    <h5>Token Symbol: {tokenSymbol}</h5>
                )}
            </div>

            <div className="p-3 border col-md-4 mx-auto">
                <input
                    placeholder="Recipient"
                    className="form-control mb-2"
                    value={recipient}
                    onChange={e => setRecipient(e.target.value)}
                />
                <input
                    placeholder="Amount"
                    className="form-control mb-3"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-primary" onClick={handleTransfer} disabled={isBusy}>
                        {writeTransferHook.status === 'pending' ? 'Transferring...' : 'Transfer'}
                    </button>
                    <button className="btn btn-success" onClick={handleMint} disabled={isBusy}>
                        {writeMintHook.status === 'pending' ? 'Minting...' : 'Mint'}
                    </button>
                    <button className="btn btn-danger" onClick={handleBurn} disabled={isBusy}>
                        {writeBurnHook.status === 'pending' ? 'Burning...' : 'Burn'}
                    </button>
                </div>

                {(writeTransferHook.error || writeMintHook.error || writeBurnHook.error) && (
                    <div className="mt-2 text-danger small">
                        {writeTransferHook.error && <div>❌ Error: User rejected Transfer request.</div>}
                        {writeMintHook.error && <div>❌ Error: User rejected Mint request.</div>}
                        {writeBurnHook.error && <div>❌ Error: User rejected Burn request.</div>}
                    </div>
                )}
            </div>
        </>
    );
}
