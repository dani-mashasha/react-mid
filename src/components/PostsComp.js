import React, { useEffect, useState } from "react";
import { AddPostForm } from "./AddPostForm.js";
import { PostComp } from "./PostComp.js";

export const PostsComp = ({ posts, currUserId, hideUserData, addPost }) => {
    const [userPosts, setUserPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);

    const handleShowForm = (bool) => {
        setShowPostForm(bool);
    };

    useEffect(() => {
        const usposts = posts.filter((post) => post.userId === currUserId);
        setUserPosts(usposts);
    }, [currUserId, posts, addPost]);

    return (
        <>
            <div>
                {" "}
                <h3>
                    {`Posts - User ${currUserId}`}
                    <button
                        onClick={() => {
                            setShowPostForm(true);
                        }}
                    >
                        Add
                    </button>
                </h3>
            </div>

            <div className="todos_wrapper">
                {showPostForm ? (
                    <AddPostForm
                        addPost={addPost}
                        currUserId={currUserId}
                        handleShowForm={handleShowForm}
                    />
                ) : userPosts.length > 0 ? (
                    <div>
                        {userPosts.map((post) => (
                            <PostComp key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <span>No Posts...</span>
                    </div>
                )}
            </div>
        </>
    );
};
