import Image from 'next/image'
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline'
const Post = ({ name, email, timestamp, image, postImage, message }) => {
    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                    <img
                        className="rounded-full"
                        src={image} alt={name} height={40} width={40} />
                    <div>
                        <p className="font-medium">{name}</p>
                        {timestamp ? (
                            <p
                                className="text-xs text-gray-400"
                            >{new Date(timestamp?.toDate()).toLocaleString()}</p>


                        ) : (
                            <p className="text-gray-400 text-xs">Loading</p>
                        )}
                    </div>
                </div>
                <p className="pt-4">{message}</p>
            </div>
            {postImage && (
                <div className="relative h-56 md:h-96 bg-white">
                    <Image layout="fill" src={postImage} alt={name} objectFit="cover" />
                </div>
            )}
            {/* Footer */}
            <div className="flex justify-between items-center rounded-b-2xl
            bg-white text-gray-400 shadow-md border-t
            ">

                <div className="inputIcon rounded-none rounded-bl-2xl">
                    <ThumbUpIcon className="h-4" />
                    <p className="text-xs sm:text-base">Like</p>
                </div>
                <div className="inputIcon rounded-none">
                    <ChatAltIcon className="h-4" />
                    <p className="text-xs sm:text-base">Comment</p>
                </div>
                <div className="inputIcon rounded-none rounded-br-2xl">
                    <ShareIcon className="h-4" />
                    <p className="text-xs sm:text-base">Share</p>
                </div>
            </div>
        </div>
    )
}

export default Post
