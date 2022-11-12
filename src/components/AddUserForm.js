import React, { useState } from "react";

export const AddUserForm = ({ addUser, hideForm }) => {
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const habdleSubmit = () => {
        addUser(user);
        setUser({});
        hideForm();
    };
    return (
        <div className="add_form_wrapper">
            <span>Add New User</span>

            <form className="add_form">
                <label>
                    Name :{" "}
                    <input
                        name="name"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    ></input>
                </label>
                <br></br>
                <br></br>
                <label>
                    Email :{" "}
                    <input
                        name="email"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    ></input>
                </label>
                <br />
                <div className="btn_grup">
                    <button
                        className="btn"
                        onClick={() => {
                            hideForm();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn"
                        onClick={() => {
                            habdleSubmit();
                        }}
                    >
                        Add
                    </button>{" "}
                </div>
            </form>
        </div>
    );
};
