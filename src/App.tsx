import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'
import { Link, BrowserRouter, Route, Routes, } from 'react-router-dom'
import './App.css'
import ArtworkCR from './components/ArtworkCR'
import Search from './components/Search'
import Artworks from './components/Artworks'
import Gallery from './components/Gallery'
import ArtworkRUD from './components/ArtworkRUD'


const App = () => {

  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/artworks/:id' element={<ArtworkCR/>}/>
        <Route path='/artworks/search' element={<Search/>}/>
        <Route path='/my-artworks' element={<Artworks/>}/>
        <Route path='/my-artworks/:id' element={<ArtworkRUD/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
  
}

export default App;
