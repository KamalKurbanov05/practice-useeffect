import React , {useState} from "react";
import "./css/Post.css"

export default function Post(props) {
    const [showAllCard, setShowAllCard] = useState(false);

    let handlerCard = () => {
        props.changeDisabledPaginatorPage(true);
        setShowAllCard(true);
    }

    let hanlerClose = () => {
        props.changeDisabledPaginatorPage(null);
        setShowAllCard(false);
    }

    if (showAllCard) {
        return (
            <div className="post-full">
                <div>
                    <h4>{props.post.title}</h4>
                    <p>{props.post.body}</p>
                </div>
                <div 
                    className="close"
                    onClick={hanlerClose}
                />
            </div>
        )
    }
    return (
        <li onClick={handlerCard} className="post">
            <h4>{props.post.title}</h4>
        </li>
    )
}