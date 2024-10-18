import { graphql } from "gatsby";
import * as React from "react";
import { IGatsbyImageData } from "gatsby-plugin-image";
import "photoswipe/dist/photoswipe.css";
import { Gallery as PhotoGallery, Item } from "react-photoswipe-gallery";
import Layout from "../components/layout";
import { getDateFromMMYYYY, getMonthName } from "../utils";

const MyGallery = ({ images }) => {
  return (
    <PhotoGallery withCaption id="my-gallery">
      <div>
        {images.map((img) => {
          const thumbUrl = img.thumb?.images?.fallback?.src;
          const { width, height, images } = img.full;
          const mainUrl = images.fallback.src;

          return (
            <Item<HTMLImageElement>
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
interface ImageSharpEdge {
  node: {
    childImageSharp: {
      thumb: IGatsbyImageData;
      full: IGatsbyImageData;
    };
    dir;
    modifiedTime;
  };
}

interface PageProps {
  data: {
    images: {
      edges: ImageSharpEdge[];
    };
  };
}

const IndexPage: React.FC<PageProps> = ({ data }) => {
  const dirImagesMap = {}; // 04-2022: {images: Images[], date: getDateFromMMYYYY(mmyyyy)}
  data.images.edges.forEach(({ node }) => {
    const arr = node.dir.split("/");
    // eg. arr ends with ['12-2023', 'art']. Gets 'art'
    const folder = arr[arr.length - 2];
    if (dirImagesMap[folder] === undefined) {
      dirImagesMap[folder] = { images: [], date: getDateFromMMYYYY(folder) };
    }
    dirImagesMap[folder].images.push({
      ...node.childImageSharp,
      dir: node.dir,
      modifiedTime: node.modifiedTime,
      name: node.childImageSharp.thumb?.images.fallback?.src.split("/").pop(),
    });
  });
  const entries = Object.entries(dirImagesMap).sort(
    (a, b) => b[1].date - a[1].date
  );

  return (
    <Layout>
      {entries.map(([folder, obj]) => {
        const [monthStr, year] = folder.split("-");
        const { date, images } = obj;
        return (
          <div key={folder}>
            <h2>{`${getMonthName(monthStr)} ${year}`}</h2>
            <MyGallery images={images} />
          </div>
        );
      })}
    </Layout>
  );
};

export const pageQuery = graphql`
  query ImagesForGallery {
    images: allFile {
      edges {
        node {
          dir
          modifiedTime
          childImageSharp {
            full: gatsbyImageData(layout: FIXED, width: 700)
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
`;

export default IndexPage;
