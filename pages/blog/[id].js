const Post = ({ post }) => {
    return (
        <>
            {post.content}
        </>
    )
}

export default Post

export const getServerSideProps = async ({ res, params }) => {
    const result = await fetch(`http://localhost:5000/posts/${params.id}`)
    const json = await result.json()
    if (json.data && json.data.post) {
        return {
            props: {
                post: json.data.post
            }
        }
    }
    else {
        res.statusCode = 302
        res.setHeader('Location', '/blog')
    }
}