import { Container, Table } from 'react-bootstrap';



const tokenomicsData = [
  { label: 'Total Supply', value: '1,000,000,000 ICO Tokens' },
  { label: 'Sale Allocation', value: '60%' },
  { label: 'Team & Advisors', value: '15%' },
  { label: 'Marketing', value: '10%' },
  { label: 'Development Fund', value: '10%' },
  { label: 'Reserve', value: '5%' },
];



export default function About() {
  return (
    <section id="tokenomics" className="tokenomics-section">
      <Container>
        <h2 className="mb-4 text-center">Tokenomics</h2>
        <Table striped bordered hover responsive="md" className="mx-auto" style={{ maxWidth: '600px' }}>
          <tbody>
            {tokenomicsData.map(({ label, value }, idx) => (
              <tr key={idx}>
                <td>{label}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </section>
  );
}
