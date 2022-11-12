import React, { useState } from "react";

export const AddPostForm = ({ addPost, currUserId, handleShowForm }) => {
    // const [title, setTitle] = useState("");
    // const [body, setBody] = useState("");
    const [post, setPost] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost({
            ...post,
            userId: currUserId,
        });
        handleShowForm(false);
    };

    return (
        <form className="add_item_form" onSubmit={(e) => handleSubmit(e)}>
            <label>Title: </label>
            <input
                name="title"
                onChange={(e) => {
                    handleChange(e);
                }}
            ></input>
            <br />
            <br />
            <label>Body: </label>
            <input
                name="body"
                onChange={(e) => {
                    handleChange(e);
                }}
            ></input>
            <div className="btn_grup">
                <button type="submit">Add</button>
                <button onClick={() => handleShowForm(false)}>Cancel</button>
            </div>
        </form>
    );
};
