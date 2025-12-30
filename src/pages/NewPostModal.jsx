import axios from "axios";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function NewPostModal({ show, handleClose }) {
    const [postContent, setContent] = useState("");

    const handleSave () => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            title: "Post Title",
            content: postContent,
            userId: userId,
        };

        axios
            .post("https://twitter-api-codewithmj.sigma=school-full-stack.repl.co/posts", data)
            .then((response) => {
                console.log("Success:", response.data);
                handleClose();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="postContent">
                                <Form.Control placeholder="What is happening?" as="textarea" rows={3} value={postContent} onChange={(e) => setContent(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSave} className="rounded-pill">
                            Tweet
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}