import { graphql } from 'gatsby'
import * as React from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import Gallery from '../gallery'

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
    // Generate name based on the index as caption.
    caption: `Image ${index}`,
    name: node.childImageSharp.full?.images.fallback.src.split('/').pop()
  }))

  // Override some of Lightbox options to localise labels in French
  const lightboxOptions = {
    imageLoadErrorMessage: 'Impossible de charger cette image',
    nextLabel: 'Image suivante',
    prevLabel: 'Image précédente',
    zoomInLabel: 'Zoomer',
    zoomOutLabel: 'Dézoomer',
    closeLabel: 'Fermer',
  }

  //Add callback to Lightbox onCloseRequest
  const onClose = () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState(null, '', url);
  }

  return (
    <div>
      <p>Filters: </p>
      <Gallery
        images={images}
        lightboxOptions={lightboxOptions}
        onClose={onClose}
      />
    </div>
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
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`

export default IndexPage
