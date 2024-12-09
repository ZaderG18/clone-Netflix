import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/navbar'
import Banner from '../../assets/images/bannerOnePiece.jpg'
import hero_title from '../../assets/images/tituloOnePiece.png'



const home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className='banner'>
        <img src={Banner} alt="" className='banner-img'/>
        <div className="banner-content">
            <img src={hero_title} alt="" className='banner-title'/>
            <p>Welcome to One Piece</p>
            <div className="hero-btns">
                <button><img src="" alt="" />Play</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default home
