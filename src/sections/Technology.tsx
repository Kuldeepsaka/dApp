import { Container, ListGroup } from 'react-bootstrap';



const techStack = [
  'Ethereum Smart Contracts (Solidity)',
  'Web3.js / Ethers.js',
  'IPFS for decentralized storage',
  'React + React Bootstrap frontend',
  'Infura / Alchemy for blockchain RPC',
];


export default function About() {
  return (
    <section id="technology" className="">
      <Container>
        <h2 className="mb-4 text-center">Technology</h2>
        <ListGroup className="mx-auto" style={{ maxWidth: '600px' }}>
          {techStack.map((tech, idx) => (
            <ListGroup.Item key={idx}>{tech}</ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </section>
  );
}
