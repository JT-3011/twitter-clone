import { Col, Image, Row, Button, Modal, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1";
    const url = "https://10c46eb4-c5d0-487c-889a-e9b70df1dd9c-00-174sl0g18jsr9.pike.replit.dev"
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();
    useEffect(() => {
        if (authToken) {
            navigate("/profile");
        }
    }, [authToken, navigate]);


    const handle: Login = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { username, password });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    const handleClose = () => setModalShow(null);
    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6}>
                <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue" }}></i>
                <p classname="mt-5" style={{ fontSize: 64 }}>Happening Now</p>
                <h2 className="my-5" style={{ fontSize: 31 }}>Join Twitter Today.</h2>
                <Col sm={5} className="d-grid gap-2">
                    <Button classname="rounded-pill" variant="outline-dark">
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button classname="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    <p style={{ tedxAlign: "center" }}>or</p>

                    <Button classname="rounded-pill" onClick={handleShowSignUp}>Create an account</Button>
                    <p style={{ fontSize: 12 }}>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                    <p classname="mt-5" style={{ fontWeight: "bold" }}>Already have an account?</p>
                    <Button classname="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>Sign in</Button>
                </Col>
                <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
                    <Modal.Body>
                        <h2 classname="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "SignUp" ? "Create your account" : "Log in to your account"}
                        </h2>
                        <Form classname="d-grid gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>

                            <p style={{ fontSize: "12px" }}>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.</p>
                            <Button className="rounded-pill" type="submit">{modalShow === "SignUp" ? "Sign up" : "Log in"}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row >
    );
}