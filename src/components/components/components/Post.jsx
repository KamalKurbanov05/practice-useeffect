import React from "react";

export default function Post(props) {
    return(
        <li>
            {props.post.id}
            <h4>{props.post.title}</h4>
            <p>{props.post.body}</p>
        </li>
    )
}