import { graphql } from "gatsby";
import * as React from "react";
import { MyGallery, ImageSharpEdge } from "../components/MyGallery";
import Layout from "../components/layout";
import { FilterBar } from "../FilterBar";
import Header from "../components/header";

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
    isSSR ? "" : params.get("filter") || "",
  );
  const images = data.images.edges
    .filter(({ node }) => node.childImageSharp)
    .map(({ node }) => ({
      ...node.childImageSharp,
      dir: node.dir,
      modifiedTime: node.modifiedTime,
      name: node.childImageSharp.thumb?.images.fallback?.src.split("/").pop(),
    }));
  const folders = Array.from(
    new Set(images.map((im) => im.dir.split("/").pop())),
  ).sort();

  const filteredImages = filter.length
    ? images.filter((img) => img.dir.endsWith(filter))
    : images;

  return (
    <Layout>
      <Header siteTitle="Anny's comics"></Header>
      <p>
        These comics are made by hand with a Sharpie and post-it notes. They're
        inspired by my life events.
      </p>
      <p>
        Click on an image to see detail. Click on a filter to filter images.
      </p>
      <FilterBar folders={folders} filter={filter} setFilter={setFilter} />
      <MyGallery
        images={filteredImages}
        captionFn={(img) => {
          const folderName = img.dir.split("/").at(-2);
          return `${img.name} ${folderName}`;
        }}
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query ImagesForGallery {
    images: allFile(
      sort: { modifiedTime: DESC }
      filter: { relativeDirectory: { regex: "/^((?!paper-cutting).)*$/" } }
    ) {
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
