import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { getMonthName, sortByMMYYYY } from "../utils";
import Header from "../components/header";

export default function HomePage({ data }) {
  const monthToCountMap: Record<string, number> = {};

  data.allFile.nodes.forEach((o) => {
    const _month = o.dir.split("/").find((seg) => /^\d{2}-\d{4}$/.test(seg)); // 01-2023
    if (!_month) return; 

    monthToCountMap[_month] = (monthToCountMap[_month] ?? 0) + 1;
  });
  // {"01-2023": 24}
  const uniqueMonths: string[] = sortByMMYYYY(Object.keys(monthToCountMap));

  return (
    <Layout>
      <Header siteTitle="Anny's comics"></Header>
      <ul>
        {uniqueMonths
          .filter((month) => month.includes("-"))
          .map((month) => {
            const [monthStr, year] = month.split("-");

            return (
              <li key={month}>
                <Link to={`/comics/${month}`}>
                  <h3 className="header">{`${getMonthName(
                    monthStr,
                  )} ${year}: +${monthToCountMap[month]}`}</h3>
                </Link>
              </li>
            );
          })}
      </ul>
    </Layout>
  );
}

export const pageQuery = graphql`
{
  allFile(filter: { relativeDirectory: { regex: "/^gallery\\/\\d{2}-\\d{4}/" } }) {
    nodes {
      dir
    }
  }
}
`;
