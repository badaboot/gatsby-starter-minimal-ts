import { graphql } from 'gatsby'
import * as React from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import 'photoswipe/dist/photoswipe.css'
import { Gallery as PhotoGallery, Item } from 'react-photoswipe-gallery'
import Layout from '../components/layout'

function setQueryStringParameter(name, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.pushState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
}

const MyGallery = ({ images }) => {
  return <PhotoGallery withCaption id="my-gallery">
    <div>
      {images.map((img) => {
        const thumbUrl = img.thumb?.images?.fallback?.src
        const { width, height, images } = img.full
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
  const [filter, setFilter] = React.useState('')
  const images = data.images.edges.map(({ node }) => ({
    ...node.childImageSharp,
    dir: node.dir,
    modifiedTime: node.modifiedTime,
    name: node.childImageSharp.thumb?.images.fallback?.src.split('/').pop()
  }))
  const folders = Array.from(new Set(images.map(im => im.dir.split('/').pop())))

  const filteredImages = filter.length ?
    images.filter(img => img.dir.endsWith(filter)) : images

  return (
    <Layout>
      <div className='filterBar'>Filters: {folders.map(f => {
        return <span className={f === filter ? 'selected' : 'filter'}
          key={f} onClick={() => {
            setFilter(f)
            setQueryStringParameter('filter', f)
          }}>{f}</span>
      })} <span className='clear' onClick={() => {
        setFilter('')
        // removes all queries
        window.history.pushState(null, '', window.location.pathname);
      }}>Clear</span></div>
      <MyGallery images={filteredImages} />
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
