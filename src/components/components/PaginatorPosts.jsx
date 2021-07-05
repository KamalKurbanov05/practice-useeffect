import React,{useState} from "react";
import Post from "./components/Post"
import "./css/PaginatorPosts.css"


export default function PaginatorPosts(props) {
    const [range, setRange] = useState (
        {
            from: 0,
            to: 9,
            countPostsOnPage: 10,
        }
    );

    const [disabledPaginatorPage, SetDisabledPaginatorPage] = useState(null)

    let listPosts;
    if (range.countPostsOnPage === "all") {
        listPosts = props.listPosts;
    } else {
        listPosts = props.listPosts.filter((_, index) => index >= range.from && index <= range.to);
    }

    let handlerForm = (ev) => {
        ev.preventDefault()
    }

    let changeDisabledPaginatorPage = (val) => {
        SetDisabledPaginatorPage(val)
    }

    let handlerSelect = (ev) => {

        setRange(Object.assign({},
            {
                from: 0,
                to: isNaN(Number(ev.target.value))? props.listPosts.length: Number(ev.target.value)-1,
                countPostsOnPage: isNaN(parseInt(ev.target.value))? ev.target.value: parseInt(ev.target.value),
            })
        )
    }

    let handlerNext = () => { 
        setRange( Object.assign({}, range,
            {
                from: range.to + 1,
                to: range.to + range.countPostsOnPage 
            })
        )
    }

    let disabledNext = () => {
        if (range.to >= props.listPosts.length-1 || range.countPostsOnPage === 'all') {
            return true;
        } else {
            return false;
        }
    }

    let handlerPrevious = () => {
        setRange( Object.assign({}, range, 
            {
                from: range.from - range.countPostsOnPage,
                to: range.from - 1,
            })
        )
    }

    let disabledPrevious = () => {
        if (range.from <= 0 || range.countPostsOnPage === 'all') {
            return  true;
        } else {
            return false;
        }
    }

    let handlerInTheEnd = () => {
        setRange( Object.assign({}, range, 
            {
                from: props.listPosts.length - range.countPostsOnPage,
                to: props.listPosts.length,
            })
        )
    }

    let disabledForInTheEnd = () => {
        if (range.to >= props.listPosts.length-1 || range.countPostsOnPage === 'all') {
            return  true;
        } else {
            return false;
        }
    }

   let hanlerInTheBegining = () => {
        setRange(Object.assign({}, range, 
            {
                from: 0, 
                to: range.countPostsOnPage - 1,
            })
        )
    }

    let disabledInTheBegining = () => {
        if (range.from <= 0 || range.countPostsOnPage === 'all') {
            return  true;
        } else {
            return false;
        }
    }

    return (
            <div className="paginator-content" 
                style={
                        {
                            pointerEvents: disabledPaginatorPage && "none",
                        }
                    }
            >
                <ul className="paginator-content__list">
                    {
                        listPosts.map((post, index) => {
                            return (
                                <Post 
                                    changeDisabledPaginatorPage={changeDisabledPaginatorPage}
                                    post={post} 
                                    key={index}
                                />
                            )
                        })
                    }
                </ul>
                <div className="bottom">
                    <form 
                        className="form" 
                        onSubmit={handlerForm}
                    >
                        <label>
                            Число постов на одной странице
                            <select
                                className="select-box"
                                onChange={handlerSelect}
                                value={range.countPostsOnPage}
                                name="select"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value="all">all</option>
                            </select>
                        </label>
                    </form>
                    <div className="block-arrow">
                        <button
                            onClick={hanlerInTheBegining}
                            className="in-the-begining"
                            style={
                                    {
                                        backgroundColor: disabledInTheBegining() && "#F5F5F5",
                                        cursor: disabledInTheBegining()? "no-drop": "pointer",
                                    }
                                }
                            disabled={disabledInTheBegining()}
                        />
                        <button 
                            onClick={handlerPrevious}
                            className="previous"
                            style={
                                    {
                                        backgroundColor: disabledPrevious() && "#F5F5F5",
                                        cursor: disabledPrevious()? "no-drop": "pointer",
                                    }
                                }
                            disabled={disabledPrevious()}
                        />
                        <button
                            onClick={handlerNext}
                            className="next"
                            style={
                                    {
                                        backgroundColor: disabledNext() && "#F5F5F5",
                                        cursor: disabledNext()? "no-drop": "pointer",
                                    }
                                }
                            disabled={disabledNext()}
                        />
                        <button 
                            onClick={handlerInTheEnd}
                            className="in-the-end"
                            style={
                                    {
                                        backgroundColor:disabledForInTheEnd() && "#F5F5F5",
                                        cursor: disabledForInTheEnd()? "no-drop": "pointer",
                                    }
                                }
                            disabled={disabledForInTheEnd()}
                        />
                    </div>
                </div>
                <div>{`${range.from+1} - ${range.to < props.listPosts.length? range.to+1: range.to} from ${props.listPosts.length}`}</div>
            </div>
        )
}