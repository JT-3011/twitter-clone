import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updatePost } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function UpdatePostModal({ show, handleClose, postId, originalPostContent }) {
    const [newPostContent, setNewPostContent] = useState(originalPostContent);
    const [newFile, setNewFile] = useState(null);
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;
}
const handleUpdate = () => {
    dispatch(updatePost({ userId, postId, newPostContent, newFile }));
    handleClose();
    setNewPostContent("");
    setNewFile(null);
};
const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
};