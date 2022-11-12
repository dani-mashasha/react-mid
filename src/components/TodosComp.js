import React, { useEffect, useState } from "react";
import { AddTodoForm } from "./AddTodoForm.js";
import { TodoComp } from "./TodoComp.js";

export const TodosComp = ({
    todos,
    currUserId,
    hideUserData,
    updateTodo,
    addTodo,
}) => {
    const [userTodos, setUserTodos] = useState([]);
    const [showTodoForm, setShowTodoForm] = useState(false);

    const handleShowTodo = (bool) => {
        setShowTodoForm(bool);
    };

    useEffect(() => {
        const ustos = todos.filter((todo) => todo.userId === currUserId);
        setUserTodos(ustos);
    }, [currUserId, todos, addTodo]);

    return (
        <>
            <div>
                {" "}
                <h3>
                    {`Todos - User ${currUserId}`}
                    <button
                        onClick={() => {
                            setShowTodoForm(true);
                        }}
                    >
                        Add
                    </button>
                </h3>
            </div>

            <div className="todos_wrapper">
                {showTodoForm ? (
                    <AddTodoForm
                        addTodo={addTodo}
                        currUserId={currUserId}
                        handleShowTodo={handleShowTodo}
                    />
                ) : userTodos.length > 0 ? (
                    <div>
                        {userTodos.map((todo) => (
                            <TodoComp
                                key={todo.id}
                                todo={todo}
                                updateTodo={updateTodo}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        <span>No Todos...</span>
                    </div>
                )}
            </div>
        </>
    );
};
