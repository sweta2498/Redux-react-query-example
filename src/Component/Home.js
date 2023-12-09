import React from 'react'

import logo from '../img/logo.jpg'

const Home = () => {
    return (
        <div>
            <section className='header' id='home'>
                <nav>
                    <a href=''><img src={logo} /></a>
                    <div className='nav-links' id='navlink'>
                        <ul>
                            <li><a href='#home'>Home</a></li>
                            <li><a href='/login'>Login</a></li>
                            <li><a href='/signin'>Signin</a></li>
                            <li><a href='#blog'>Shop</a></li>
                            <li><a href='#about'>About</a></li>
                            <li><a href='#contact'>Contact</a></li>
                        </ul>
                    </div>

                </nav>

                <div className="text-box">
                    <h1>Online Shopping </h1>
                    <p>Making WEbsite is World's biggest Shopping.... </p>
                    <a href='' className='hero-btn'>GetStarted</a>
                </div>
            </section></div>
    )
}

export default Home