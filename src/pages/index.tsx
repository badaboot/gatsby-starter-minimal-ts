import { graphql } from 'gatsby'
import * as React from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import 'photoswipe/dist/photoswipe.css'
import { Gallery as PhotoGallery, Item } from 'react-photoswipe-gallery'
import Layout from '../components/layout'

const MyGallery = ({ images }) => {
  return <PhotoGallery withCaption id="my-gallery">
    <div>
      {images.map((img) => {
        const thumbUrl = img.thumb?.images?.fallback?.src 
        const {width, height, images} = img.full
        const mainUrl = images.fallback.src
        
        return <Item<HTMLImageElement>
          original={mainUrl}
          width={width}
          height={height}
          key={img.name}
          alt={img.name}
          id={img.name}
          caption={img.name}
        >
          {/* thumbnail */}
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
      fluid: IGatsbyImageData
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
    name: node.childImageSharp.thumb?.images.fallback?.src.split('/').pop()
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
            full: gatsbyImageData(
            layout: FIXED
            width: 700
            )
            thumb: gatsbyImageData(
              width: 150
              height: 150
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`

export default IndexPage
