import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const Gallery = () => {



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
      <div id='gallerycontainer'>
        <div id='galleryimgdiv'>
            
        </div>
      </div>
        <div id='galleryinfocontainer'>
            <h1 id='gallery'>Gallery</h1>
            <img id='infologo' src={process.env.PUBLIC_URL + '/ArtLogo.png'}/>
        </div>
        
        </>
    )
    
}

export default Gallery

//responsive design, have bottom text move right as ecreen enlarges; flex column to flex row with media query


