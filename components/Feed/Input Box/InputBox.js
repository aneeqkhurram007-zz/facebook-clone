import Image from 'next/image'
import { useSession } from 'next-auth/client'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { useRef, useState } from 'react'
import { db, storage } from '../../../firebase/firebase'
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
const InputBox = () => {
    const inputRef = useRef(null);
    const filePickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null)
    const [session] = useSession()

    const sendPost = (e) => {
        e.preventDefault();
        if (!inputRef.current.value) return
        addDoc(collection(db, 'posts'), {
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: Timestamp.now()
        }).then(docs => {
            if (imageToPost) {
                uploadString(ref(storage, `posts/${docs.id}`), imageToPost,
                    'data_url').then(() => {
                        getDownloadURL(ref(storage, `posts/${docs.id}`)).then(url => {
                            setDoc(doc(db, 'posts', docs.id), {
                                postImage: url
                            }, {
                                merge: true,
                            })
                        })
                    }).catch(err => console.error(err))
                removeImage()
                // OLD Method
                // uploadTask.on('state_changed', null, error => console.error(error), () => {
                //     // When it completes
                //     getDownloadURL(ref(storage, `posts/${docs.id}`)).then(url => {
                //         setDoc(doc(db, 'posts', docs.id), {
                //             postImage: url
                //         }, {
                //             merge: true,
                //         })
                //     })
                // })
            }
        })
        inputRef.current.value = ''
    }
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result)
        }
    }
    const removeImage = () => {
        setImageToPost(null)
    }
    return (
        <div className="bg-white p-2 rounded-2xl shadow-md
        text-gray-500 font-medium mt-6
        ">
            <div className
                ="flex space-x-4 p-4 items-center">
                <Image
                    className="rounded-full"
                    src={session.user.image}
                    width={40}
                    height={40}
                    layout="fixed"
                    alt="user image"
                />
                <form className="flex flex-1">
                    <input
                        ref={inputRef}
                        className="rounded-full h-12 focus:outline-none bg-gray-100 flex-grow
                    px-5
                    "
                        type="text" placeholder={`What's on your mind ${session.user.name}`} />
                    <button hidden type="submit" onClick={sendPost}>Submit</button>
                </form>
                {imageToPost && (
                    <div onClick={removeImage} className="flex flex-col hover:brightness-110
                    transition duration-150 transform hover:scale-105 cursor-pointer
                    ">
                        <img className="h-10 object-contain" src={imageToPost} alt="Image Post" />
                        <p className="text-xs text-red-500 text-center">Remove</p>
                    </div>
                )}
            </div>
            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <div onClick={() => {
                    filePickerRef.current.click()

                }} className="inputIcon">
                    <CameraIcon className="h-7 text-green-400" />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
                </div>
                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox
