import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
    const user = await fetch(`http://localhost:3000/users/${params.userId}`);
    const posts = await fetch(
        `http://localhost:3000/posts?userId=${params.userId}`
    );
    const comments = await fetch(
        `http://localhost:3000/comments?userId=${params.userId}`
    );

    return {
        user: await user.json(),
        posts: await posts.json(),
        comments: await comments.json(),
    };
};

export const User = () => {
    const { posts, comments, user } = useLoaderData();

    return (
        <div className="user">
            <h1>{user.name}</h1>

            {posts.length > 0 && (
                <>
                    <h2>Posts:</h2>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </div>
                    ))}
                </>
            )}

            {comments.length > 0 && (
                <>
                    <h2>Comments:</h2>
                    {comments.map((comment) => (
                        <div key={comment.id}>
                            <Link to={`/post/${comment.postId}`}>
                                {comment.comment}
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
