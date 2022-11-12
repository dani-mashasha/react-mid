import React from "react";

export const TodoComp = ({ todo, updateTodo }) => {
    return (
        <div className="todo">
            <div>
                <span>{`Title: ${todo.title}`}</span>
                <br />
                <br />
                <span>{`Completed: ${todo.completed}`}</span>
            </div>
            <div>
                {!todo.completed && (
                    <button
                        onClick={() => updateTodo(todo.id, { completed: true })}
                    >
                        Mark Completed
                    </button>
                )}
            </div>
        </div>
    );
};
