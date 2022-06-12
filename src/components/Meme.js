import React, {useState} from 'react'
import memesData from './memesData'

const Meme = () => {
    // const [memeImage, setMemeImage] = useState('https://i.imgflip.com/30b1gx.jpg')

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/30b1gx.jpg"
    })

    const [allMemeImages, setAllMemeImages] = React.useState(memesData)


    function getMemeImage(){
        const memesArray = allMemeImages.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        
        setMeme(prevMeme => {
           return  {
                ...prevMeme,
                randomImage:url
            }
        })
    }
    return (
        <main>
        <div className="form">
            <input 
                type="text"
                placeholder="Top text"
                className="form--input"
            />
            <input 
                type="text"
                placeholder="Bottom text"
                className="form--input"
            />
            <button 
                className="form--button"
                onClick={getMemeImage}
            >
                Get a new meme image 🖼
            </button>
        </div>
        <img  className="meme--image" src={meme.randomImage} alt="new meme everytime"/>
    </main>
    )
}

export default Meme
