import { Col, Container, Row } from 'react-bootstrap';
import ThemedCard from '../components/common/ThemedCard/ThemedCard';

const solutions = [
  {
    title: 'Decentralized Exchange',
    description: 'Trade tokens securely with no intermediaries and low fees.',
  },
  {
    title: 'Smart Contract Audits',
    description: 'Ensure your contracts are safe with professional auditing tools.',
  },
  {
    title: 'Wallet Integration',
    description: 'Connect your wallet easily to manage your assets on our platform.',
  },
];

export default function OurSolutions() {
  return (
    <section id="solutions" className="">
      <Container>
        <h2 className="mb-4 text-center">Our Solutions</h2>
        <Row>
          {solutions.map(({ title, description }, idx) => (
            <Col key={idx} md={4} className="mb-4">
              <ThemedCard title={title} text={description} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
