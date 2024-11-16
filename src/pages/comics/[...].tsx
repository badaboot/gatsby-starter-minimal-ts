import { graphql } from "gatsby";
import * as React from "react";
import "photoswipe/dist/photoswipe.css";
import Layout from "../../components/layout";
import { getDateFromMMYYYY, getMonthName } from "../../utils";
import { MyGallery, ImageSharpEdge } from "../../components/MyGallery";
import { FilterBar } from "../../FilterBar";

interface DirImageMap {
  [key: string]: {
    date: Date;
    images: ImageSharpEdge[];
  };
}
const MonthPage = (props) => {
  const month = props.params[`*`];

  const data = props.data.images.edges.filter((o) => {
    return o.node.dir.includes(month);
  });

  const folders = new Set();
  const dirImagesMap: DirImageMap = {};
  // TODO: this is very similar to all.tsx. Refactor a filter component/hook
  const isSSR = typeof window === "undefined";
  const params = isSSR
    ? new URLSearchParams("")
    : new URLSearchParams(window.location.search);
  const [filter, setFilter] = React.useState(
    isSSR ? "" : params.get("filter") || ""
  );
  data.filter(({ node }) => {
    const arr = node.dir.split("/");
    // eg. arr ends with ['12-2023', 'art']. Gets 'art'
    const folder = arr[arr.length - 2];
    folders.add(arr.at(-1));

    if (dirImagesMap[folder] === undefined) {
      dirImagesMap[folder] = { images: [], date: getDateFromMMYYYY(folder) };
    }
    if ((filter.length && node.dir.endsWith(filter)) || !filter.length) {
      dirImagesMap[folder].images.push({
        ...node.childImageSharp,
        dir: node.dir,
        modifiedTime: node.modifiedTime,
        name: node.childImageSharp.thumb?.images.fallback?.src.split("/").pop(),
      });
    }
  });
  const entries = Object.entries(dirImagesMap).sort(
    (a, b) => b[1].date - a[1].date
  );

  const sortedFolders = Array.from(folders).sort();

  return (
    <Layout>
      <p>Click on an image to see detail.</p>
      {entries.map(([folder, obj]) => {
        const [monthStr, year] = folder.split("-");
        return (
          <div key={folder}>
            <h2 className="header">{`${getMonthName(monthStr)} ${year}`}</h2>
            <FilterBar
              folders={sortedFolders}
              filter={filter}
              setFilter={setFilter}
            />
            <MyGallery images={obj.images} />
          </div>
        );
      })}
    </Layout>
  );
};

// TODO: change this to filter by month in param
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

export default MonthPage;
