import React, { useEffect, useState } from "react";
import { AddUserForm } from "./AddUserForm.js";
import { PostsComp } from "./PostsComp.js";
import { TodosComp } from "./TodosComp.js";
import { UserComp } from "./UserComp.js";

export const UsersComp = ({ dataBase, actions }) => {
    const [users, setUsers] = useState([]);
    const [currUserId, setCurrUserId] = useState(0);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUserData, setShowUserData] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        const filterdUsers = dataBase.users.filter(
            (user) =>
                user.name.toUpperCase().includes(value) ||
                user.email.toUpperCase().includes(value)
        );
        setUsers(filterdUsers);
    };
    const onAddUser = () => {
        setShowAddForm(true);
        setCurrUserId(0);
        setShowUserData(false);
    };

    const hideForm = () => {
        setShowAddForm(false);
        setCurrUserId(0);
    };
    const hideUserData = () => {
        setShowUserData(false);
        setCurrUserId(0);
    };

    const onSelectUser = (id) => {
        setCurrUserId(id);
        setShowUserData(true);
        setShowAddForm(false);
    };
    useEffect(() => {
        setUsers(dataBase.users);
    }, [dataBase]);

    return (
        <>
            <div className="users_grid">
                <div id="search_bar">
                    <label>
                        Search:
                        <input onChange={(e) => handleChange(e)}></input>
                    </label>
                    <button
                        className="add_btn"
                        onClick={() => {
                            onAddUser();
                        }}
                    >
                        Add User
                    </button>
                </div>
                <div>
                    {users?.map((user) => (
                        <UserComp
                            key={user.id}
                            user={user}
                            dataBase={dataBase}
                            actions={actions}
                            currUserId={currUserId}
                            onSelectUser={onSelectUser}
                            hideUserData={hideUserData}
                        />
                    ))}
                </div>
            </div>
            <div className="side_menu">
                {showAddForm && (
                    <AddUserForm
                        addUser={actions.addUser}
                        hideForm={hideForm}
                    />
                )}
                {showUserData && (
                    <>
                        <TodosComp
                            todos={dataBase.todos}
                            currUserId={currUserId}
                            hideUserData={hideUserData}
                            updateTodo={actions.updateTodo}
                            addTodo={actions.addTodo}
                        />
                        <PostsComp
                            posts={dataBase.posts}
                            currUserId={currUserId}
                            hideUserData={hideUserData}
                            addPost={actions.addPost}
                        />
                    </>
                )}
            </div>
        </>
    );
};
