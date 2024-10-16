import React, { FC } from 'react'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import 'photoswipe/dist/photoswipe.css'

import { Gallery as PhotoGallery, Item } from 'react-photoswipe-gallery'

// import * as LightboxCSS from 'react-image-lightbox/style.css'

export interface ImageProp {
  full: IGatsbyImageData
  thumb: IGatsbyImageData
  thumbAlt?: string
  title?: React.ReactNode
  name?: React.ReactNode
}

export interface GalleryProps {
  images: ImageProp[]
}

const MyGallery = ({ images }) => {
  return <PhotoGallery>{

    images.map((img) => {
      // URLs for full width images
      const mainSrc = img?.full?.images?.fallback?.src
      
      const thumbImage = getImage(img.thumb)
      console.log(thumbImage?.width)
      const thumbUrl = thumbImage?.images?.fallback?.src
      return <Item
        original={mainSrc}
        thumbnail={thumbUrl}
        width={img?.full?.width}
        height={img?.full?.height}
      >
        {({ ref, open }) => (
          <img ref={ref} onClick={open} src={thumbUrl} />
        )}
      </Item>
    })}
  </PhotoGallery>
}

const Gallery: FC<GalleryProps> = ({
  images = [],
}) => {
  return (
    <React.Fragment>
      <MyGallery images={images} />
    </React.Fragment>
  )
}

export default Gallery
