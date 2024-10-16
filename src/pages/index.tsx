import { graphql } from 'gatsby'
import * as React from 'react'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import 'photoswipe/dist/photoswipe.css'
import { Gallery as PhotoGallery, Item } from 'react-photoswipe-gallery'
import Layout from '../components/layout'

const MyGallery = ({ images }) => {
  return <PhotoGallery withCaption id="my-gallery">
    <div>
      {images.map((img) => {
        // URLs for full width images
        const thumbImage = getImage(img.thumb)
        const thumbUrl = thumbImage?.images?.fallback?.src
        let src = ''
        let width = 0
        let height = 0
        // on mobile devices
        if (img.fixed.width > img.full.width) {
          src = img.full.src
          width = img.full.width
          height = img.full.height
        } else {
          src = img.fixed.src
          width = img.fixed.width
          height = img.fixed.height
        }
        return <Item<HTMLImageElement>
          original={src}
          thumbnail={thumbUrl}
          width={width}
          height={height}
          key={img.name}
          alt={img.name}
          id={img.name}
          caption={img.name}
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
