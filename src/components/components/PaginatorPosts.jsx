import React,{useState} from "react";
import Post from "./components/Post"
import "./css/PaginatorPosts.css"


export default function PaginatorPosts(props) {
    const [range, setRange] = useState(
        {
            from: 0,
            to: 9,
            countPostsOnPage: 10,
        }
    );
    console.log("range" ,range)

    if  (range.to >= props.listPosts.length-1 || range.countPostsOnPage === 'all') {
        console.log(`preventDefault`)
    }

    let listPosts = props.listPosts.filter((post, index) => {
        if (range.countPostsOnPage === "all") {
            return post
        } else {
            if (index >= range.from && index <= range.to) {
                return post;
            }
        }
    });

    let handlerForm = (ev) => {
        ev.preventDefault()
    }

    let handlerSelect = (ev) => {
        console.log("ev.target.value" ,ev.target.value);
        
        setRange(Object.assign({},
            {
                from: 0,
                to: ev.target.value - 1,
                countPostsOnPage: isNaN(parseInt(ev.target.value))? ev.target.value: parseInt(ev.target.value),
            })
        )
    }

    let handlerNext = (ev) => {
        setRange( Object.assign({}, range,
            {
                from: range.to,
                to: range.to + range.countPostsOnPage
            })
        )
    
    }

    let handlerPrevious = () => {
        setRange( Object.assign({}, range, 
            {
                from: range.from - range.countPostsOnPage,
                to: range.from, 
            })

        )
    }

    return (
        <>
            <ul>
                {listPosts.map((post, index) => {
                    return (
                        <Post post={post} key={index}/>
                    )
                })
            }
            </ul>
            <form onSubmit={handlerForm}>
                <label>
                    Число постов на одной странице
                    <select
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
            <div
            style={{display:"inline-block", padding: "20px", border: "2px solid black", width: "10vw"}}
            onClick={range.to >= props.listPosts.length-1 || range.countPostsOnPage === 'all'? undefined: handlerNext}
            >
                next
            </div>
            <div 
            style={{display:"inline-block", padding: "20px", border: "2px solid black", width: "10vw"}} 
            onClick={range.from <= 0 || range.countPostsOnPage === 'all'? undefined: handlerPrevious}
            >
                previous
            </div>
        </>
    )
}