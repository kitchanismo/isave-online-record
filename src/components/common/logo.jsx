import React, { Component, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { appUrl } from '../../config.json'
const Logo = () => {
  const items = [
    { id: 1, src: `${appUrl}/user.png` },
    { id: 2, src: `${appUrl}/edit.png` },
    { id: 3, src: `${appUrl}/login.png` }
  ]

  const getGalleryItems = () =>
    items.map(i => <img src={i.src} key={i.id}></img>)

  const [galleryItems, setGalleryItems] = useState(getGalleryItems())

  return (
    <React.Fragment>
      <div className="logo">{/* <AliceCarousel items={galleryItems} /> */}</div>

      <style jsx="">{`
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 5px 0 0 5px;
          background-color: #343a40;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Logo
