import React, { useEffect, useState } from "react";

export const UserComp = ({
    user,
    dataBase,
    actions,
    currUserId,
    onSelectUser,
    hideUserData,
}) => {
    const [hover, setHover] = useState(false);
    const [isCompleted, setIsComplited] = useState(true);
    const [onUpdateUser, setOnUpdateUser] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});

    const checkIsCompleted = () => {
        const userTodos = dataBase.todos.filter(
            (todo) => todo.userId === user.id
        );
        let isChanged = false;
        for (let i = 0; i < userTodos.length; i++) {
            if (!userTodos[i].completed) {
                setIsComplited(false);
                isChanged = true;
            }
        }
        if (!isChanged) {
            setIsComplited(true);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "city" || name === "street" || name === "zipcode") {
            const address = updatedUser.address;
            setUpdatedUser({
                ...updatedUser,
                address: { ...address, [name]: value },
            });
        } else {
            setUpdatedUser({ ...updatedUser, [name]: value });
        }
    };

    const handleUpdateUser = () => {
        actions.updateUser(user.id, updatedUser);
        setOnUpdateUser(false);
    };
    const handleDeleteUser = () => {
        actions.deleteUser(user.id);
        hideUserData();
    };

    useEffect(() => {
        checkIsCompleted();
        setUpdatedUser(user);
    }, [dataBase, user]);

    return (
        <div
            className={`user_details ${isCompleted ? "completed" : ""} ${
                currUserId === user.id ? "selected" : ""
            }`}
        >
            <label
                onClick={() => {
                    onSelectUser(user.id);
                }}
            >{`ID : ${user.id}`}</label>
            <br />
            <label>
                Name :
                {onUpdateUser ? (
                    <input
                        name="name"
                        value={updatedUser.name}
                        onChange={(e) => handleChange(e)}
                    ></input>
                ) : (
                    user.name
                )}
            </label>
            <br />
            <label>
                {" "}
                Email :
                {onUpdateUser ? (
                    <input
                        name="email"
                        value={updatedUser.email}
                        onChange={(e) => handleChange(e)}
                    ></input>
                ) : (
                    user.email
                )}
            </label>
            <br />
            <button
                onMouseEnter={() => setHover(true)}
                onClick={() => setHover(false)}
            >
                Other Data
            </button>
            <div className={!hover && !onUpdateUser ? "hidden" : "other_data"}>
                <label>
                    Street :
                    {onUpdateUser ? (
                        <input
                            name="street"
                            value={updatedUser?.address?.street || null}
                            onChange={(e) => handleChange(e)}
                        ></input>
                    ) : user?.address?.street ? (
                        user?.address?.street
                    ) : (
                        "Please Update"
                    )}
                </label>
                <br />
                <label>
                    {" "}
                    City :
                    {onUpdateUser ? (
                        <input
                            name="city"
                            value={updatedUser?.address?.city || null}
                            onChange={(e) => handleChange(e)}
                        ></input>
                    ) : user?.address?.city ? (
                        user?.address?.city
                    ) : (
                        "Please Update"
                    )}
                </label>
                <br />
                <label>
                    Zip Code :
                    {onUpdateUser ? (
                        <input
                            name="zipcode"
                            value={updatedUser?.address?.zipcode || null}
                            onChange={(e) => handleChange(e)}
                        ></input>
                    ) : user?.address?.zipcode ? (
                        user?.address?.zipcode
                    ) : (
                        "Please Update"
                    )}
                </label>
                <br />
            </div>

            {onUpdateUser ? (
                <div className="btn_grup">
                    <button
                        onClick={() => {
                            handleUpdateUser();
                        }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setOnUpdateUser(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="btn_grup">
                    <button onClick={() => setOnUpdateUser(true)}>
                        Update
                    </button>
                    <button onClick={() => handleDeleteUser()}>Delete</button>
                </div>
            )}
        </div>
    );
};
