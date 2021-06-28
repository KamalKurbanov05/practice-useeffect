import React, {useState, useEffect} from "react";
import PaginatorPosts from "./components/PaginatorPosts";

export default function DataPosts() {
    const [listPosts, setListPosts] = useState([])


    useEffect(
        () => {
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                return response.json()
            })
            .then((listData) => {
                setListPosts(listData)
            }).catch(console.log("this err"))
        },
        []
    )

    console.log(listPosts)
    return (
        <>
            <PaginatorPosts listPosts={listPosts} />
        </>
    )
}