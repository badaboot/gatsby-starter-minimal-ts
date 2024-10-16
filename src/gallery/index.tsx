import React  from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import 'photoswipe/dist/photoswipe.css'

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

const smallItemStyles: React.CSSProperties = {
  cursor: 'pointer',
  objectFit: 'cover',
  width: '100%',
  maxHeight: '100%',
}


const MyGalleryTwo = () => <PhotoGallery id="my-gallery">
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '240px 171px 171px',
      gridTemplateRows: '114px 114px',
      gridGap: 12,
    }}
  >
    <Item<HTMLImageElement>
      original="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
      thumbnail="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
      width="1600"
      height="1600"
      alt="Photo of seashore by Folkert Gorter"
      // You can pass string id
      id="first-pic"
    >
      {({ ref, open }) => (
        <img
          style={{ cursor: 'pointer' }}
          src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
          ref={ref}
          onClick={open}
        />
      )}
    </Item>
    <Item<HTMLImageElement>
      original="https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg"
      thumbnail="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
      width="1600"
      height="1068"
      alt="Photo of mountain lake by Samuel Rohl"
      // You can pass number id
      id={999}
    >
      {({ ref, open }) => (
        <img
          style={smallItemStyles}
          src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
          ref={ref}
          onClick={open}
        />
      )}
    </Item>
    <Item<HTMLImageElement>
      original="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg"
      thumbnail="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
      width="1600"
      height="1066"
      alt="Photo of fog in the village by Ales Krivec"
    // Or you can miss id (photo index will be used automatically)
    >
      {({ ref, open }) => (
        <img
          style={smallItemStyles}
          src="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
          ref={ref}
          onClick={open}
        />
      )}
    </Item>
    <Item<HTMLImageElement>
      original="https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg"
      thumbnail="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
      width="1600"
      height="1066"
      alt="Photo of river sunset by Michael Hull"
    >
      {({ ref, open }) => (
        <img
          style={{ ...smallItemStyles, gridColumnStart: 2 }}
          src="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
          ref={ref}
          onClick={open}
        />
      )}
    </Item>
    <Item<HTMLImageElement>
      original="https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg"
      thumbnail="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
      width="1600"
      height="1066"
      alt="Photo of bear by Thomas Lefebvre"

    >
      {({ ref, open }) => (
        <img
          style={smallItemStyles}
          src="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
          ref={ref}
          onClick={open}
        />
      )}
    </Item>
  </div>
</PhotoGallery>
 

export default MyGalleryTwo
