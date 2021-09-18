import StoryCard from "./StoryCard/StoryCard"
import { createApi } from 'unsplash-js'
import { useEffect, useState } from "react"
import responseAPI from "../../../utils/response"

const Stories = () => {
    const [response, setresponse] = useState([])
    //    1st Method 
    const serverApi = createApi({
        accessKey: 'HwYVRQfNwCKtCt-O-XSGPirxusKkV4W4lWEfmighhs0',
        //...other fetch options
    });
    useEffect(() => {

        responseAPI ? setresponse(responseAPI) : serverApi.photos.getRandom({ count: 10 }).then(res => {
            setresponse(res.response)
        })
    }, [serverApi.photos])

    return (
        <div className="flex justify-center space-x-3 mx-auto">
            {response.map(({ id, user: { first_name, profile_image: { large } } }) => (
                <StoryCard key={id} name={first_name}
                    src={large} profile={large} />
            ))}
        </div>
    )
}


export default Stories
