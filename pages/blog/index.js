import { useState, useEffect } from 'react'
import Link from 'next/link'

const Blog = () => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [loadButtonDisabled, setLoadButtonDisabled] = useState(false)
    useEffect(() => {
        fetch(`http://localhost:5000/posts?page=${page}&limit=10`)
            .then(res => res.json())
            .then(json => setPosts(json.data.posts))
            .catch(console.log)
    }, [])
    const loadMorePosts = () => {
        setPage(prevPage => prevPage + 1)
        fetch(`http://localhost:5000/posts?page=${page + 1}&limit=10`)
            .then(res => res.json())
            .then(json => {
                if (json.data.posts.length)
                    setPosts(prevPosts => [...prevPosts, ...json.data.posts])
                else setLoadButtonDisabled(true)
            })
            .catch(console.log)
    }
    return (
        <>
            {posts.map(post => (
                <>
                    <p key={post._id}>{post.title}</p>
                    <Link href={'/blog/' + post.id}><a>Read more</a></Link>
                </>
            ))}
            <br />
            Total Number of Posts {posts.length}
            <br />
            {loadButtonDisabled ?
                <p>No More Posts</p> :
                <button type="submit" onClick={loadMorePosts}>Load More</button>
            }
        </>
    )
}

export default Blog