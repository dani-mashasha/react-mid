import React, { useState } from "react";

export const AddTodoForm = ({ addTodo, currUserId, handleShowTodo }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({
            title: title,
            userId: currUserId,
        });
        handleShowTodo(false);
    };

    return (
        <form className="add_item_form" onSubmit={(e) => handleSubmit(e)}>
            <label>Title: </label>
            <input
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            ></input>
            <div className="btn_grup">
                <button type="submit">Add</button>
                <button onClick={() => handleShowTodo(false)}>Cancel</button>
            </div>
        </form>
    );
};
