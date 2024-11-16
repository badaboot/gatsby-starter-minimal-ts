import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

export default function HomePage(props) {
  const monthToCountMap = {};
  props.pageResources.json.data.allFile.nodes.forEach((o) => {
    const arr = o.dir.split("/");
    const _month = arr.at(-2);
    if (monthToCountMap[_month] == undefined) {
      monthToCountMap[_month] = 0;
    }
    monthToCountMap[_month] += 1;
  });
  const uniqueMonths: string[] = Object.keys(monthToCountMap);
  return (
    <Layout>
      <ul>
        {uniqueMonths.map((month) => (
          <li key={month}>
            <Link
              to={`/comics/${month}`}
            >{`${month}: +${monthToCountMap[month]}`}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const pageQuery = graphql`
  {
    allFile {
      nodes {
        extension
        dir
        modifiedTime
      }
    }
  }
`;
