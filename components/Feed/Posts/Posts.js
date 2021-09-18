import { db } from '../../../firebase/firebase'
import { query, collection, orderBy, onSnapshot } from '@firebase/firestore'
import Post from './Post/Post'
import { useEffect, useState } from 'react'
const Posts = ({ posts }) => {
    const [realTimePosts, setrealTimePosts] = useState(null)
    useEffect(() => {
        onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
            setrealTimePosts(snapshot)
        })
    }, [])
    // const [realTimePosts] = useCollection(query(collection(db, 'posts'), orderBy('timestamp', 'desc')))
    return (
        <div>
            {
                realTimePosts ? realTimePosts?.docs.map(post => (
                    <Post

                        key={post.id}
                        name={post.data().name}
                        message={post.data().message}
                        email={post.data().email}
                        timestamp={post.data().timestamp}
                        image={post.data().image}
                        postImage={post.data().postImage}

                    />
                )) : (
                    posts.map(post => (
                        <Post

                            key={post.id}
                            name={post.name}
                            message={post.message}
                            email={post.email}
                            timestamp={post.timestamp}
                            image={post.image}
                            postImage={post.postImage}

                        />
                    ))
                )}
        </div>
    )
}

export default Posts
