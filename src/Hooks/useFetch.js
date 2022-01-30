import { useEffect,useState } from "react";

const API_KEY = import.meta.env.GIPHY_API_KEY;

const useFetch = (keyword) => {
    const [url, setUrl] = useState("")

    const fetchGifs = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`)
            const {data} = await response.json()

            setUrl(data[0]?.images?.downsized_meduim?.url);
        } catch (error) {
            setUrl('https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif')
        }
    }

    useEffect(()=> {
        if(keyword){
            fetchGifs();
        }
    }, [keyword]);

    return url;
}

export default useFetch;