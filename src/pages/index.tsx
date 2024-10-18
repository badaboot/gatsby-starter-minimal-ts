import { graphql } from "gatsby";
import * as React from "react";
import "photoswipe/dist/photoswipe.css";
import Layout from "../components/layout";
import { getDateFromMMYYYY, getMonthName } from "../utils";
import { MyGallery, ImageSharpEdge } from "../components/MyGallery";

interface PageProps {
  data: {
    images: {
      edges: ImageSharpEdge[];
    };
  };
}

interface DirImageMap {
  [key: string]: {
    date: Date;
    images: ImageSharpEdge[];
  };
}
const IndexPage: React.FC<PageProps> = ({ data }) => {
  const dirImagesMap: DirImageMap = {};
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
      <p>Click on an image to see detail.</p>
      {entries.map(([folder, obj]) => {
        const [monthStr, year] = folder.split("-");
        return (
          <div key={folder}>
            <h2 className="header">{`${getMonthName(monthStr)} ${year}`}</h2>
            <MyGallery images={obj.images} />
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
