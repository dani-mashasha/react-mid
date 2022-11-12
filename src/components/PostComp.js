import React from "react";

export const PostComp = ({ post }) => {
    return (
        <div className="post">
            <span>{`Title: ${post?.title}`}</span>
            <br />
            <br />
            <span>{`Body: ${post?.body}`}</span>
        </div>
    );
};
