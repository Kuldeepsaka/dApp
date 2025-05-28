import { Navbar, Nav, Container } from 'react-bootstrap';
import { ThemeSwitcher } from '../Hooks/ThemeSwitcher';
import { useAppSelector } from '../store/hooks';

export default function Header() {
  const mode = useAppSelector((state) => state.theme.mode);

  const links = [
    { name: 'About', to: 'about' },
    { name: 'Our Solutions', to: 'solutions' },
    { name: 'Technology', to: 'technology' },
    { name: 'Tokenomics', to: 'tokenomics' },
    { name: 'Roadmap', to: 'roadmap' },
  ];

  const handleScroll = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -50; // negative offset to stop 50px before the element
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Navbar
      bg={mode === 'dark' ? 'dark' : 'light'}
      variant={mode === 'dark' ? 'dark' : 'light'}
      expand="lg"
      sticky="top"
      className="shadow-sm transition-theme"
    >
      <Container>
        <Navbar.Brand href="#">ICO DApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            {links.map(({ name, to }) => (
              <Nav.Link
                key={to}
                href={`#${to}`}
                onClick={(e) => handleScroll(to, e)}
              >
                {name}
              </Nav.Link>
            ))}
            <div className="ms-3">
              <ThemeSwitcher />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
