import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout";

const PaperCuttingPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1>Paper Cutting</h1>
      <p>Happy cutting!</p>
    </Layout>
  );
};

export default PaperCuttingPage;

export const Head: HeadFC = () => <title>Not found</title>;
