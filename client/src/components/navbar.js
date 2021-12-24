import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LoginModal from "../components/auth/loginModal";
import RegiterModal from "../components/auth/registerModal";
import { logoutHandler } from "../redux/actions/action-auth";

export default function NavFct() {
  const dispatch = useDispatch()
  const logoutUser=()=>{
    dispatch(logoutHandler())
  }
  const authLinks = (
    <>
      <Link to="/dashboard">
        {" "}
        <Nav.Link href="#features">Dashboard</Nav.Link>
        <Button onClick={logoutUser} > Logout </Button>
      </Link>
    </>
  );

  const visitorLinks = (
    <>
      <div className="navBtns">
        <LoginModal />
        <RegiterModal />
      </div>
    </>
  );
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log(isAuth);
  return (
    <div className="Navbar">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/images/logo.png"
              width="45"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">
              <Nav.Link href="#home">Home</Nav.Link>
            </Link>
            {isAuth ? authLinks : visitorLinks}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
