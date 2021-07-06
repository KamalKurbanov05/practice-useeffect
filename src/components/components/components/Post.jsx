import React , {useState} from "react";
import "./css/Post.css"

export default function Post(props) {
    const [showAllCard, setShowAllCard] = useState(false);

    let handlerCard = () => {
        window.scrollTo(
            {
                top: 0, 
                left: 0,
                behavior: "smooth"
            })
        document.body.style.overflow = "hidden";
        props.changeDisabledPaginatorPage(true);
        setShowAllCard(true);
    }

    let hanlerClose = () => {
        document.body.style.overflow = "scroll";
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