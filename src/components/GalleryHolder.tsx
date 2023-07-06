import React from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

export const Basic: any = () => {
  const images = [
    "b&w.jpg",
    "bear.jpg",
    "mountain.jpg",
    "vtall.jpg",
    "water.jpg",
  ];
  return (
    <Gallery id="my-gallery">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "171px 171px",
          gridTemplateRows: "114px 114px",
          gridGap: 12,
        }}
      >
        {images.map((path) => {
          const isVertical = path.startsWith('v');
          const [width, height] = [800, isVertical ? 800 : 500];
          return (
            <Item
              key={path}
              original={`../images/${path}`}
              thumbnail={`../images/${path}`}
              width={width}
              height={height}
              alt={path}
              // You can pass string id
              id={path}
            >
              {({ ref, open }) => (
                <img
                  style={{ cursor: "pointer" }}
                  src={`../images/${path}`}
                  ref={ref as React.MutableRefObject<HTMLImageElement>}
                  onClick={open}
                  width={171}
                  height={114 }
                />
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
};

export default Basic;
