import React,{useState} from "react";
import "./css/PaginatorPosts.css"

const RANGE = 10;

export default function PaginatorPosts(props) {
    const [indexRange, setIndexRange] = useState([0, RANGE]);
    const [clickCard, setClickCard] = useState(
        {
            cardId: null,
            opacityForOtherCard: 1,
        });


    let handlerCard = (id) => {
        setClickCard(
            {
                cardId: id,
                opacityForOtherCard: 0.09,
            }
        )
    }

    let handlerPreviousBtn = () => {
        if (indexRange[0] === 0) {
            setIndexRange([props.listPosts.length - 1 - RANGE, props.listPosts.length -1]);
        } else {
            setIndexRange(
                [
                    (indexRange[0]-10) < 0? 0: indexRange[0]-10, indexRange[0]
                ]
            );
        }
    }

    let handlerNextBtn = () => {
        if (indexRange[1] === props.listPosts.length -1) {
            setIndexRange([0, RANGE]);
        } else {
            setIndexRange([indexRange[1], indexRange[1] + 10]);
        }
    }

    let handlerCloseBtn = () => {
        setClickCard(
            {
                cardId: null,
                opacityForOtherCard: 1,
            }
        )
    }

    let listPosts = props.listPosts.slice(indexRange[0], indexRange[1]) 
    return (
        <>
            <ul className="list-wrapper"> 
                {listPosts.map((post, index) => {
                    if (post.id === clickCard.cardId) {
                        return(
                            <li 
                                key={index}
                                className="card-after-click">
                                <h3 className="card__title">{post.title}</h3>
                                <p className="card__body card-body-after-click">{post.body}</p>
                                <span 
                                onClick={handlerCloseBtn}
                                className="card__close"
                                >
                                </span>
                            </li>
                        )
                    } else {
                        return(
                            <li
                                onClick={clickCard.cardId !== null?() => false:() => handlerCard(post.id)}
                                key={index}
                                className="card"
                                style={
                                    {
                                        opacity: `${clickCard.opacityForOtherCard}`,
                                    }
                                }
                                >
                                <h3 className="card__title">
                                    {post.title.length > 40? post.title.slice(0, 40) + "...": post.title}
                                </h3>
                                <p className="card__body">
                                    {post.body.length > 50? post.body.slice(0, 50) + "...": post.body}
                                </p>
                            </li>
                        )
                    }
                }
                )
                }
            </ul>
            <div className="btn previous" onClick={handlerPreviousBtn}>Previous</div>
            <div className="btn next" onClick={handlerNextBtn}>Next</div>
        </>
    )
}