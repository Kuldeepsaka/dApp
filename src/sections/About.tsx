import { Container } from 'react-bootstrap';
import { WalletOptions } from '../components/walletConnect/connect';
import { TokenBalance } from '../components/walletConnect/TokenBalance';
import { TokenActions } from '../components/walletConnect/TokenActions';

export default function About() {

  return (
    <section id="about" className="">
      <Container>
        <h2 className="mb-4 text-center">Connect Wallet</h2>
        <div className='col-12 text-center my-4'>
          <WalletOptions />
          <TokenBalance />
          <TokenActions />
        </div>
        <p className="lead text-center mx-auto" style={{ maxWidth: '700px' }}>
          We are building a revolutionary decentralized Application to empower users worldwide with blockchain technology.
          Our ICO will enable community-driven growth and transparent fundraising.
        </p>
      </Container>
    </section>
  );
}
