import { useState } from 'react'
import Link from 'next/link'

const Blog = ({ allPosts }) => {
    const [posts, setPosts] = useState(allPosts)
    const [page, setPage] = useState(1)
    const [loadButtonDisabled, setLoadButtonDisabled] = useState(false)
    const loadMorePosts = () => {
        setPage(prevPage => prevPage + 1)
        fetch(`http://localhost:5000/posts?page=${page + 1}&limit=20`)
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
                <div key={post._id}>
                    <p>{post.title}</p>
                    <Link href={'/blog/' + post.id}><a>Read more</a></Link>
                </div>
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

export const getServerSideProps = async ({ res }) => {
    try {
        const result = await fetch(`http://localhost:5000/posts?page=1&limit=20`)
        const json = await result.json()
        return {
            props: {
                allPosts: (json.data && json.data.posts) ? json.data.posts : []
            }
        }
    } catch (err) {
        console.log(err)
        res.statusCode = 302
        res.setHeader('Location', '/')
    }
}