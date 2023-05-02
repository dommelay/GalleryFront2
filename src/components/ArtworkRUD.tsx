import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {useParams, Link, useNavigate } from 'react-router-dom'

export interface MyArtwork {
    marker: number;
    title: string;
    image_id: string;
    api_link: string;
    date_start: number;
    date_end: number;
    place_of_origin: string;
    artwork_type_title: string;
    artist_title: string;
    iiif_url: string;
    imageSrc: string;
    updateLink: string;
    _id: number;
  }

const ArtworkRUD = () => {
    const navigate = useNavigate()
    const {id} = useParams<{id: string}>()
    const [artwork, setArtwork] = useState<MyArtwork | null>()

    const handleArtwork = () => {
        axios.get(`https://domsgallery.herokuapp.com/my-artworks/${id}`).then((response) => {
            setArtwork(response.data)
        })
    }
    const handleDelete = (event: React.MouseEvent <HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        axios.delete(`https://domsgallery.herokuapp.com/my-artworks/${id}`).then((response) => {
            navigate('/gallery')
        })
    } 

    useEffect(() => {
        handleArtwork()
    }, [])



    return (
        <>
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
            {artwork 
            ? 
            <div>
              <h2 key={artwork.marker}>{artwork.title}</h2>
              <img src={artwork.imageSrc}/>
              <button onClick={handleDelete}>Delete From Collection</button>
            </div>
          : <p>Loading...</p>}
         

         </>

    )
}


export default ArtworkRUD