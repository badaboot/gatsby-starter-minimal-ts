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
    comics: {
      edges: {
        node: {
          filename: string;
          created: string;
          categories: string[];
        };
      }[];
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

  const metadataMap = new Map(
    data.comics.edges.map(({ node }) => [node.filename, node]),
  );

  const images = data.images.edges
    .filter(({ node }) => node.childImageSharp)
    .map(({ node }) => {
      const name = node.childImageSharp.thumb?.images.fallback?.src
        .split("/")
        .pop();
      const meta = metadataMap.get(name);
      return {
        ...node.childImageSharp,
        dir: node.dir,
        name,
        created: meta?.created,
        categories: meta?.categories ?? [],
      };
    })
    .sort((a, b) => {
      const dateA = a.created ?? "0000-00-00";
      const dateB = b.created ?? "0000-00-00";
      return dateB.localeCompare(dateA);
    });

  const folders = Array.from(
    new Set(images.flatMap((img) => img.categories)),
  ).sort();

  const filteredImages = filter.length
    ? images.filter((img) => img.categories.includes(filter))
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
        captionFn={(img) => `${img.name} ${img.created}`}
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query ImagesForGallery {
    images: allFile(
      filter: { relativeDirectory: { regex: "/gallery/" } }
    ) {
      edges {
        node {
          dir
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
    comics: allComicsJson {
      edges {
        node {
          filename
          created
          categories
        }
      }
    }
  }
`;

export default IndexPage;
