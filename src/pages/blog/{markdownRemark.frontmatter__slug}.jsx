import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import Header from "../../components/header";

export default function BlogPostTemplate({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <div className="post">
        <Header textAlign="center" siteTitle={frontmatter.title} />
        <h4 style={{ textAlign: "center" }}>{frontmatter.date}</h4>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
