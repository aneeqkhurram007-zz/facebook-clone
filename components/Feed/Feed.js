import InputBox from "./Input Box/InputBox"
import Posts from "./Posts/Posts"
import Stories from "./Stories/Stories"

const Feed = ({ posts }) => {
    return (
        <div className="flex-grow h-screen pb-44 
        scrollbar-hide
        pt-6 mr-4 xl:mr-40 overflow-y-auto">
            <div className="mx-auto max-w-md md:max-w-lg" >
                <Stories />
                <InputBox />
                {/* Posts */}
                <Posts posts={posts} />
            </div>
        </div>
    )
}

export default Feed
