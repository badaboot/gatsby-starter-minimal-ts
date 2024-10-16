import React, { FC, useState } from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import Lightbox from 'react-image-lightbox'
import styled from 'styled-components'

import Row from './row'
import ImageColWrapper from './image-col-wrapper'

import * as LightboxCSS from 'react-image-lightbox/style.css'

export interface ImageProp {
  full: IGatsbyImageData
  thumb: IGatsbyImageData
  thumbAlt?: string
  title?: React.ReactNode
  name?: React.ReactNode
}

export interface GalleryProps {
  images: ImageProp[]
  colWidth?: number
  mdColWidth?: number
  rowMargin?: number
  gutter?: string
  imgClass?: string
  lightboxOptions?: object
  onClose?: () => void
  customWrapper?: React.FC
}

const StyledLightbox = styled(Lightbox)`
  ${LightboxCSS}
`

const Gallery: FC<GalleryProps> = ({
  images = [],
  colWidth = 100 / 3,
  mdColWidth = 100 / 4,
  gutter = '0.25rem',
  rowMargin = -15,
  imgClass = '',
  lightboxOptions = {},
  onClose = () => { },
  customWrapper = ImageColWrapper,
}) => {
  const [index, setIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const prevIndex = (index + images.length - 1) % images.length
  const nextIndex = (index + images.length + 1) % images.length
  const ImgColWrapper = customWrapper

  // URLs for full width images
  const mainSrc = images[index]?.full?.images?.fallback?.src
  const nextSrc = images[nextIndex]?.full?.images?.fallback?.src
  const prevSrc = images[prevIndex]?.full?.images?.fallback?.src

  const onCloseLightbox = () => {
    onClose()
    setIsOpen(false)
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState(null, '', url);
  }

  return (
    <React.Fragment>
      <Row margin={rowMargin}>
        {images.map((img, imgIndex) => {
          const thumbImage = getImage(img.thumb)
          if (!thumbImage) {
            return null
          }
          return (
            <ImgColWrapper
              colWidth={colWidth}
              mdColWidth={mdColWidth}
              key={imgIndex}
              onClick={() => {
                setIsOpen(true)
                setIndex(imgIndex)
                const url = new URL(window.location.href);
                url.searchParams.set('isOpen', 'true');
                url.searchParams.set('name', images[imgIndex].name);
                window.history.pushState(null, '', url);
              }}
              gutter={gutter}
            >
              <GatsbyImage
                image={thumbImage}
                className={imgClass}
                alt={img.thumbAlt || ''}
              />
            </ImgColWrapper>
          )
        })}
      </Row>
      {isOpen && (
        <StyledLightbox
          mainSrc={mainSrc || ''}
          nextSrc={nextSrc || ''}
          prevSrc={prevSrc || ''}
          onCloseRequest={onCloseLightbox}
          onMovePrevRequest={() => {
            setIndex(prevIndex)
            const url = new URL(window.location.href);
            url.searchParams.set('name', images[prevIndex].name);
            window.history.pushState(null, '', url);
          }}
          onMoveNextRequest={() => {
            setIndex(nextIndex)
            const url = new URL(window.location.href);
            url.searchParams.set('name', images[nextIndex].name);
            window.history.pushState(null, '', url);
          }}
          imageTitle={images[index].title}
          imageCaption={images[index].name}
          {...lightboxOptions}
        />
      )}
    </React.Fragment>
  )
}

export default Gallery
