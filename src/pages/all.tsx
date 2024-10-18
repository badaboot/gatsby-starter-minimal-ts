import { graphql } from "gatsby";
import * as React from "react";
import { MyGallery, ImageSharpEdge } from "../components/MyGallery";
import Layout from "../components/layout";
import { FilterBar } from "../FilterBar";

interface PageProps {
  data: {
    images: {
      edges: ImageSharpEdge[];
    };
  };
}

const IndexPage: React.FC<PageProps> = ({ data }) => {
  const isSSR = typeof window === "undefined";
  const params = isSSR
    ? new URLSearchParams("")
    : new URLSearchParams(window.location.search);
  const [filter, setFilter] = React.useState(
    isSSR ? "" : params.get("filter") || ""
  );
  const images = data.images.edges.map(({ node }) => ({
    ...node.childImageSharp,
    dir: node.dir,
    modifiedTime: node.modifiedTime,
    name: node.childImageSharp.thumb?.images.fallback?.src.split("/").pop(),
  }));
  const folders = Array.from(
    new Set(images.map((im) => im.dir.split("/").pop()))
  );

  const filteredImages = filter.length
    ? images.filter((img) => img.dir.endsWith(filter))
    : images;

  return (
    <Layout>
      <p>
        Click on an image to see detail. Click on a filter to filter images.
      </p>
      <FilterBar folders={folders} filter={filter} setFilter={setFilter} />
      <MyGallery images={filteredImages} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query ImagesForGallery {
    images: allFile(sort: { modifiedTime: DESC }) {
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
