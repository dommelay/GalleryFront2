import React from 'react'
import axios from 'axios'
import {useState, useEffect } from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'

export interface MyArtwork {
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
    marker: number;
    _id: string;
  }

const MyArtwork = () => {
   const [artworks, setArtworks] = useState<MyArtwork[]>([])
   const navigate = useNavigate()
   const [fullsize, setFullsize] = useState(true)
   
   const handleArtworks = () => {
    axios.get('https://domsgallery.herokuapp.com/my-artworks').then((response) => {
        setArtworks(response.data)
    })
   
   }
   
   useEffect(() => {
    handleArtworks()
},[])

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
   <div id='myartworksdiv'>
        <h1 id='myartworks'>My Artworks</h1>
   </div>
    <div className='myartworkscontainer'>

    {artworks.map((artwork) => {
        const handleDelete = (event: React.MouseEvent <HTMLDivElement, MouseEvent>) => {
            event.preventDefault()
            axios.delete(`https://domsgallery.herokuapp.com/my-artworks/${artwork._id}`).then((response) => {
                handleArtworks()
            })
        } 
        const handleShowMore = (event: React.MouseEvent <HTMLButtonElement, MouseEvent>) => {

        }
        return (
            <>
            { fullsize ?
            <div className='myartwork'>
                <div className='myartworkimg'>
                    <img src={artwork.imageSrc}/>
                </div>
                <div className='myartworkinfo'>
                    <h1 className='myartworktitle'>{artwork.title}</h1>
                    <div className='myartworkdetailcontainer'>
                        <div>
                            <p className='myartworkdetail artist'>{artwork.artist_title}</p>
                            <p className='myartworkdetail date'>{artwork.date_start} - {artwork.date_end}</p>
                        </div>
                        <div className='origintypediv'>
                            <p className='myartworkdetail origin'>{artwork.place_of_origin}</p>
                            <p className='myartworkdetail type'>{artwork.artwork_type_title}</p> 
                        </div>
                        <div onClick={handleDelete}className='deletediv'>
                            <h5 className='deletex'>X</h5>
                        </div>
                    </div>
                </div>
            </div>
            : <></> 
            }
            </>
        )
    })}
    </div>
  
   </> 
)




}

export default MyArtwork