import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default function SimpleGallery(props) {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      showHideAnimationType: 'none',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div className="pswp-gallery" id={props.galleryID}>
      {props.images.map((image, index) => {
        const { height, width, thumbnailURL, largeURL } = image
        console.log(height,width)

        return <a
          href={largeURL}
          data-pswp-width={width}
          data-pswp-height={height}
          key={props.galleryID + '-' + index}
          target="_blank"
          rel="noreferrer"
        >
          <img src={thumbnailURL} alt="" />
        </a>
      }
      )
      }
    </div>
  );
}
