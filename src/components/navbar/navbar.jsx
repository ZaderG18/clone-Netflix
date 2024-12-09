import React from 'react'
import './navbar.css'
import logo from '../../assets/images/logo.png'
import search_icon from '../../assets/images/search.svg'
import bell_icon from '../../assets/images/bell.png'
import profile_img from '../../assets/images/usuario.jpg'
import seta_icon from '../../assets/images/seta.svg'


const navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt="" />
        <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Filmes</li>
            <li>Séries</li>
            <li>Bombastico</li>
            <li>Minha Lista</li>
        </ul>
      </div>
      <div className='navbar-right'>
        <img src={search_icon} alt="" className='icons'/>
        <p>Infantil</p>
        <img src={bell_icon} alt="" className='icons'/>
        <div className="nav-profile">
            <img src={profile_img} alt="" className="profile"/>
            <img src={seta_icon} alt=""/>
            <div className="dropdown">
                <p>Desconectar</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default navbar
