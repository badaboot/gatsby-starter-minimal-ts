import React from "react";
import { graphql } from "gatsby";
import PostLink from "../../components/PostLink";
import Layout from "../../components/layout";
import Header from "../../components/header";

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => (
      <li key={edge.node.id}>
        <PostLink post={edge.node} />
      </li>
    ));

  return (
    <Layout>
      <Header siteTitle="Anny's blog"></Header>
      <ul>{Posts}</ul>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`;
