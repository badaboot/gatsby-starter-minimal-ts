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
        const mainSrc = img?.full?.images?.fallback?.src
        const thumbImage = getImage(img.thumb)
        const thumbUrl = thumbImage?.images?.fallback?.src
        return <Item<HTMLImageElement>
          key={img.name}
          alt={img.name}
          original={mainSrc}
          thumbnail={thumbUrl}
          width={img?.full?.width}
          height={img?.full?.height}
          id={img.name}
        >
          {({ ref, open }) => (
            <img ref={ref}
              style={{ cursor: 'pointer' }}
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

  return (
    <Layout>
      <p>Filters: </p>

      <MyGallery images={images} />
      {/* <Gallery /> */}
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
              width: 270
              height: 270
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
