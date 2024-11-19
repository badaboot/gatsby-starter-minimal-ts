import * as React from "react";
import { Gallery as PhotoGallery, Item } from "react-photoswipe-gallery";
import { IGatsbyImageData } from "gatsby-plugin-image";

export interface ImageSharpEdge {
  node: {
    childImageSharp: {
      thumb: IGatsbyImageData;
      full: IGatsbyImageData;
    };
    dir;
    modifiedTime;
  };
}

export const MyGallery = ({ images }) => {
  return (
    <PhotoGallery options={{ loop: false }} withCaption id="my-gallery">
      <div>
        {images.map((img) => {
          const thumbUrl = img.thumb?.images?.fallback?.src;
          const { width, height, images } = img.full;
          const mainUrl = images.fallback.src;
          const folderName = img.dir.split("/").at(-2);
          return (
            <Item<HTMLImageElement>
              original={mainUrl}
              width={width}
              height={height}
              key={img.name}
              alt={img.name}
              id={`${folderName}/${img.name}`}
              caption={`${img.name} ${folderName}`}
            >
              {/* thumbnail */}
              {({ ref, open }) => (
                <img
                  ref={ref}
                  style={{ cursor: "pointer", marginLeft: 8 }}
                  onClick={open}
                  src={thumbUrl}
                />
              )}
            </Item>
          );
        })}
      </div>
    </PhotoGallery>
  );
};
