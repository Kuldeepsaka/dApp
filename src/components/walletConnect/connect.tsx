'use client';

import { useAccount, useConnect, useDisconnect, useBalance, useEnsName } from 'wagmi';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setWalletInfo, clearWalletInfo } from '../../store/slices/walletSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


const SUPPORTED_CHAIN_IDS = [84532]; // sepolia base chain



export function WalletOptions() {
    const dispatch = useDispatch();


    const { address, isConnected, chain } = useAccount();
    const { disconnect } = useDisconnect();
    const { connect, connectors, isPending, error } = useConnect();
    const { data: balanceData } = useBalance({ address });
    const { data: ensName } = useEnsName({ address });

    const [showModal, setShowModal] = useState(false);
    const [connectingId, setConnectingId] = useState<string | null>(null);

    const handleConnect = async (connectorId: string) => {
        const connector = connectors.find(c => c.id === connectorId);
        if (!connector) return;

        try {
            setConnectingId(connectorId);
            await connect({ connector });
            toast.success('Wallet connected successfully!');
            setShowModal(false);
        } catch (err) {
            console.error(err);
        } finally {
            setConnectingId(null);
        }
    };
    const handleDisconnect = () => {
        disconnect();
        dispatch(clearWalletInfo());
        toast('Wallet disconnected', { icon: '👋' });
    };

    useEffect(() => {
        if (isConnected && address && chain) {
            dispatch(setWalletInfo({
                address,
                ensName: ensName ?? null,
                balance: balanceData?.formatted ?? null,
                symbol: balanceData?.symbol ?? null,
                chainId: chain.id,
                chainName: chain.name,
            }));
        }
    }, [isConnected, address, ensName, balanceData, chain, dispatch]);

    // Show unsupported network warning if chain is unsupported
    if (isConnected && (!chain || !SUPPORTED_CHAIN_IDS.includes(chain.id))) {
        return (
            <div className="text-center text-danger p-3 border rounded">
                Unsupported network detected. <br />
                Please switch your wallet network to <strong>Sepolia</strong> Only.
            </div>
        );
    }
    if (isConnected) {
        return (
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                <Button variant="outline-danger" size="sm" onClick={() => handleDisconnect()}>
                    Disconnect
                </Button>

                <span className="small col-12">
                    <strong>Address:</strong> {ensName ?? `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </span>

                <span className="small col-12">
                    <strong>Balance:</strong> {balanceData?.formatted.slice(0, 6)} {balanceData?.symbol}
                </span>

                <span className="small col-12">
                    <strong>Network:</strong> {chain?.name} (ID: {chain?.id})
                </span>
            </div>
        );
    }

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
                Connect Wallet
            </Button>
            <p className='text-danger'>Please Connect Wallet for buy/sell web3 interactions</p>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {connectors.map((connector) => (
                        <Button
                            key={connector.id}
                            variant="outline-dark"
                            className="w-100 mb-2"
                            onClick={() => handleConnect(connector.id)}
                            disabled={!connector || isPending}
                        >
                            {connector.name}
                            {isPending && connectingId === connector.id && ' (Connecting...)'}
                        </Button>
                    ))}
                    {error && (
                        <div className="text-danger small mt-2">{error.message}</div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
