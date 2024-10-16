import { graphql } from 'gatsby'
import * as React from 'react'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import 'photoswipe/dist/photoswipe.css'
import Gallery from '../gallery'
import { Gallery as PhotoGallery, Item } from 'react-photoswipe-gallery'
import Layout from '../components/layout'
 
const MyGallery = ({ images }) => {
  return <PhotoGallery id="my-gallery">
    <div>

      {images.map((img, index) => {
        // URLs for full width images
        const thumbImage = getImage(img.thumb)
        const thumbUrl = thumbImage?.images?.fallback?.src
        return <Item<HTMLImageElement>
          key={img.name}
          alt={img.name}
          original={img.fixed.src}
          thumbnail={thumbUrl}
          width={img?.fixed?.width}
          height={img?.fixed?.height}
          id={img.name}
        >
          {({ ref, open }) => (
            <img ref={ref}
              style={{ cursor: 'pointer', marginLeft: 8 }}
              onClick={open} src={thumbUrl} />
          )}
        </Item>
      })}
    </div>

  </PhotoGallery>
}
interface ImageSharpEdge {
  node: {
    childImageSharp: {
      thumb: IGatsbyImageData
      full: IGatsbyImageData
    }
    dir
    modifiedTime
  }
}

interface PageProps {
  data: {
    images: {
      edges: ImageSharpEdge[]
    }
  }
}

const IndexPage: React.FC<PageProps> = ({ data }) => {
  const images = data.images.edges.map(({ node }, index) => ({
    ...node.childImageSharp,
    dir: node.dir,
    modifiedTime: node.modifiedTime,
    name: node.childImageSharp?.full?.images?.fallback?.src.split('/').pop()
  }))

  const dummyImages = [
    {
      largeURL:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
      thumbnailURL:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
      width: 1875,
      height: 2500,
    },
    {
      largeURL:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
      thumbnailURL:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
      width: 1669,
      height: 2500,
    },
    {
      largeURL:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
      thumbnailURL:
        'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
      width: 2500,
      height: 1666,
    },
  ]
  const slimmedData = images.map(img => {
    return {
      largeURL: img.fixed.src,
      thumbnailURL: img.thumb.images.fallback?.src,
      width: img.fixed.width,
      height: img.fixed.height,
    }
  })
  const names = images.map(i => i.name).sort()
  console.log(names)
  return (
    <Layout>
      <p>Filters: </p>

      <MyGallery images={images} />
      {/* <Gallery images={slimmedData} galleryID="my-test-gallery"/> */}
    </Layout>
  )
}

export const pageQuery = graphql`
  query ImagesForGallery {
    images: allFile(
      filter: { relativeDirectory: { eq: "gallery" } }
      sort: { modifiedTime: DESC }
    ) { 
      edges {
        node {
          dir
          modifiedTime
          childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
            thumb: gatsbyImageData(
              width: 150
              height: 150
              placeholder: BLURRED
            )
            full: gatsbyImageData(
              width: 700
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`

export default IndexPage
