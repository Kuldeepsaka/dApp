import { Col, Container, Row } from 'react-bootstrap';
import ThemedCard from '../components/common/ThemedCard/ThemedCard';


const roadmapItems = [
  {
    phase: 'Q2 2025',
    tasks: ['Whitepaper Release', 'Smart Contract Development', 'Community Building'],
  },
  {
    phase: 'Q3 2025',
    tasks: ['Private Sale', 'Beta dApp Launch', 'Security Audit'],
  },
  {
    phase: 'Q4 2025',
    tasks: ['Public ICO Launch', 'Mainnet Deployment', 'Partnerships & Listings'],
  },
];



export default function About() {
  return (
    <section id="roadmap" className="">
      <Container>
        <h2 className="mb-4 text-center">Roadmap</h2>
        <Row>
          {roadmapItems.map(({ phase, tasks }, idx) => (
            <Col key={idx} md={4} className="mb-4">
              <ThemedCard title={phase} >
                <ul>
                  {tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </ThemedCard>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
