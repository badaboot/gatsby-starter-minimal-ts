import { graphql } from 'gatsby'
import * as React from 'react'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import Layout from '../components/layout'
// import PhotoSwipeLightbox from 'photoswipe'

// const lightbox = new PhotoSwipeLightbox({
//   gallery: '#gallery--test-closing-events',
//   children: 'a',
//   pswpModule: () => import('../../node_modules/photoswipe/dist/photoswipe.esm.js')
// });
// lightbox.on('close', () => {
//   // PhotoSwipe starts to close, unbind most events here
//   console.log('close');
// });
// lightbox.on('destroy', () => {
//   // PhotoSwipe is fully closed, destroy everything
//   console.log('destroy');
// });
// lightbox.init();

const MyGallery = ({ images }) => {
  return <Gallery>
    <div>
      {images.map((img) => {
        const mainSrc = img?.full?.images?.fallback?.src
        const thumbImage = getImage(img.thumb)
        const thumbUrl = thumbImage?.images?.fallback?.src
        return <Item
          key={img.name}
          original={mainSrc}
          thumbnail={thumbUrl}
          width={img?.full?.width}
          height={img?.full?.height}
        >
          {({ ref, open }) => (
            <img ref={ref}
              onClick={open} src={thumbUrl} />
          )}
        </Item>
      })}
    </div>

  </Gallery>
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
