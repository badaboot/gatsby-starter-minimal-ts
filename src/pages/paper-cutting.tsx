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
    metadata: {
      edges: {
        node: {
          filename: string;
          created: string;
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

  const dateMap = new Map(
    data.metadata.edges.map(({ node }) => [node.filename, node.created]),
  );

  const images = data.images.edges
    .filter(({ node }) => node.childImageSharp)
    .map(({ node }) => ({
      ...node.childImageSharp,
      dir: node.dir,
      name: node.childImageSharp.thumb?.images.fallback?.src.split("/").pop(),
      created: dateMap.get(
        node.childImageSharp.thumb?.images.fallback?.src.split("/").pop(),
      ),
    }))
    .sort((a, b) => {
      const dateA = dateMap.get(a.name) ?? "0000-00-00";
      const dateB = dateMap.get(b.name) ?? "0000-00-00";
      return dateB.localeCompare(dateA);
    });
  const folders = Array.from(
    new Set(images.map((im) => im.dir.split("/").pop())),
  ).sort();
  const filteredImages = filter.length
    ? images.filter((img) => img.dir.endsWith(filter))
    : images;

  return (
    <Layout>
      <Header siteTitle="Paper cuttings"></Header>
      <p>
        These paper cuts are made by hand with a pair of scissors and an exacto
        knife. They're inspired by Chinese paper cuts (jianzhi).
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
      filter: { relativeDirectory: { regex: "/paper-cutting/" } }
    ) {
      edges {
        node {
          dir
          childImageSharp {
            full: gatsbyImageData(
              layout: CONSTRAINED
              width: 700
              transformOptions: { fit: CONTAIN }
            )
            thumb: gatsbyImageData(
              width: 150
              height: 150
              placeholder: BLURRED
            )
          }
        }
      }
    }
    metadata: allMetadataJson {
      edges {
        node {
          filename
          created
        }
      }
    }
  }
`;

export default IndexPage;
