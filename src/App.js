import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { UsersComp } from "./components/UsersComp.js";

const baseUrl = "https://jsonplaceholder.typicode.com";

function App() {
    const [dataBase, setDataBase] = useState({});

    const initDB = async () => {
        try {
            const { data: users } = await axios.get(`${baseUrl}/users`);
            const { data: posts } = await axios.get(`${baseUrl}/posts`);
            const { data: todos } = await axios.get(`${baseUrl}/todos`);

            setDataBase({
                users,
                posts,
                todos,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addUser = (obj) => {
        const users = dataBase.users;
        const id = Date.now();
        users.push({ ...obj, id });
        setDataBase({ ...dataBase, users: users });
    };

    const updateUser = (id, obj) => {
        const users = dataBase.users;
        const updatedUsers = users.map((user) =>
            user.id === id ? { ...user, ...obj } : user
        );
        setDataBase({ ...dataBase, users: updatedUsers });
    };

    const deleteUser = (id) => {
        const users = dataBase.users;
        let index;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }
        users.splice(index, 1);
        setDataBase({ ...dataBase, users: users });
    };

    const addTodo = (obj) => {
        const todos = dataBase.todos;
        const id = Date.now();
        todos.push({ ...obj, id: id, completed: false });
        setDataBase({ ...dataBase, todos: todos });
    };

    const updateTodo = (id, obj) => {
        const todos = dataBase.todos;
        const upadtedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, ...obj } : todo
        );
        setDataBase({ ...dataBase, todos: upadtedTodos });
    };

    const addPost = (obj) => {
        const posts = dataBase.posts;
        console.log(obj);
        const id = Date.now();
        posts.push({ ...obj, id: id });
        setDataBase({ ...dataBase, posts: posts });
    };

    const actions = {
        addUser,
        updateUser,
        deleteUser,
        updateTodo,
        addTodo,
        addPost,
    };

    useEffect(() => {
        initDB();
    }, []);

    return (
        <div className="App">
            <UsersComp dataBase={dataBase} actions={actions} />
        </div>
    );
}

export default App;
