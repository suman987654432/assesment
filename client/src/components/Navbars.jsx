import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Product from '../components/Product';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import "../css/Navbar.css";

const Navbars = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalItems = cartItems.reduce((total, item) => total + (item.qnty || 0), 0);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="custom-navbar">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')} className="brand-name">
            ShopEase
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto nav-links">
              <Nav.Link onClick={() => navigate('/')} className="nav-link-custom">Home</Nav.Link>
              <Nav.Link href="#features" className="nav-link-custom">Features</Nav.Link>
              <Nav.Link href="#pricing" className="nav-link-custom">Pricing</Nav.Link>
              <Nav.Link onClick={handleCartClick} className="nav-link-custom cart-icon">
                <FaShoppingCart />
                {totalItems > 0 && (
                  <Badge pill bg="danger" className="cart-badge">
                    {totalItems}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {window.location.pathname === '/' && <Product />}
    </>
  );
};

export default Navbars;
