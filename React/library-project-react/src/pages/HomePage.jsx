import React from 'react'
import { Link } from 'react-router'

function HomePage() {
  return (
    <section id="home-page">Home Page
        <h1 className='welcome'>Welcome</h1>
        <Link to="/my-library">Go to My Library</Link>
    </section>
  )
}

export default HomePage