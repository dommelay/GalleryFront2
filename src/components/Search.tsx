import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import randomWords from 'random-words'

export interface RandomArtwork {
    imageSrc: string,
    title: string,
    id: string,
}

const Search = () => {
const [searchParam, setSearchParam] = useState('')
const [searchedArtworks, setSearchedArtworks] = useState([])
const [search, setSearch] = useState(false)
const [loading, setLoading] = useState(false)
const [generatedWord, setGeneratedWord] = useState('')
const [randomArtwork, setRandomArtwork] = useState<RandomArtwork | null>()

const randomSearchGeneration = () => {
    const randomWord: string = randomWords({ exactly: 1 })[0]
    setGeneratedWord(randomWord)
    axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${randomWord}`).then((response) => {
        if (response && response.data && response.data.data) {
        const id = (response.data.data[0].id).toString()
        console.log(id)
        axios.get(`https://api.artic.edu/api/v1/artworks/${id}`).then((response) => {
        const random = {
            imageSrc: `${response.data.config.iiif_url}/${response.data.data.image_id}/full/843,/0/default.jpg`,
            title: response.data.data.title,
            id: response.data.data.id,
        }
        setRandomArtwork(random)
    })
        } else {
            randomSearchGeneration()
        } 
    }).catch((error) => {
        console.log(error)
        randomSearchGeneration()
      })
}
const handleRandomSearch = (event: React.MouseEvent <HTMLHeadingElement, MouseEvent>) => {
    randomSearchGeneration()
}
const handleConcatination = () => {
    const input = searchParam.toString().split(' ').join('-')
    setSearchParam(input)
}
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(event.target.value)
}
const handleSubmitSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSearch(true)
    setLoading(true)
    event.preventDefault()
    handleConcatination()
    axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${searchParam}`).then((response) => {
        if (response && response.data && response.data.data) {
        console.log(response.data)
        setSearchedArtworks(response.data.data)
        }
        setLoading(false)
    })
    setSearchParam('')
}

useEffect(() => {
    randomSearchGeneration()
}, [])

    return (
        <div>
       <div className='nav'>
            <div id='topnav'>
                <Link style={{ textDecoration: 'none' }} to = {'/gallery'}>
                        <h4 className='navlink'>Home</h4>
                </Link>
            </div>
            <div id='middlenav'> 
                <Link style={{ textDecoration: 'none' }} to = {'/artworks/search'}>
                <h4 className='navlink'>Search Artworks</h4>
                </Link>
            </div>
            <div>
                <Link style={{ textDecoration: 'none' }} to={'/my-artworks'}>
                <h4 className='navlink'>My Artworks</h4>
                </Link>
            </div>
            <div id='artlogodiv'>
                <img id='artlogo' src={process.env.PUBLIC_URL + '/ArtLogo.png'} ></img>
            </div>
         </div>


            <h1 id='searchtitle'>Search Artworks</h1>
            <form>
                <label htmlFor='searchParam'></label>
                <input onChange={handleChange} type='text' name='search'/>
                <button className='CRsubmit'type='submit' onClick={handleSubmitSearch}>Search</button>
            </form>
            <div className='searchcontainer'>
            {searchedArtworks.length != 0
             && search === true ? searchedArtworks.map((artwork:{id: number, title: string, alt_text: string, thumbnail: {alt_text: string}}) => {
                
                return (  
                    <div className='searchedArt'>
                    
                            <Link to={`/artworks/${artwork.id}`}><h5 className='searchid'>{artwork.id}</h5></Link>
                        <div className='searchinfo'>
                            <h2 className='searchtitle'>{artwork.title}</h2>
                        
                        {artwork.thumbnail != null ?
                        <>
                            <h2 className='searchthumbnail'>{artwork.thumbnail.alt_text}</h2>
                        </>
                        : <>
                        <h2 className='searchthumbnail'>Description unavailable</h2></>}
                        </div>
                    </div> 
                  )
                })
                :
                ( search === false ?
                    <>
                    <div>
                        <h2>Don't know what to search? Generate an artwork randomly!</h2>
                        <h1>This is an artwork we found by searching '{generatedWord}'</h1>
                        { randomArtwork ?
                        <div>
                            <div className='searchadddiv'>
                            <Link to={`/artworks/${randomArtwork.id}`}><h4 className='addsearch'>Add Artwork</h4></Link>
                            <h4 className='randomsearch'onClick={handleRandomSearch}>Random Search</h4>
                            </div>
                        <img src={randomArtwork.imageSrc}/>
                        </div>
                           :
                           <></> }
                    </div>
                    </>
                : 
                ( loading ? <></> 
                :
                <>
                    <div>
                        <h2>Sorry, there are no results that match your search criteria. Please search again!</h2>
                    </div>
                  </>
                )
                )
                }
                </div>
    
        </div>

    )

}


export default Search

// artwork alt_text should appear only when hovering over the div.
// if else for null search