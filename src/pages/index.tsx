import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { getMonthName, sortByMMYYYY } from "../utils";
import Header from "../components/header";

export default function HomePage({ data }) {
  const monthToCountMap = {};
  data.allFile.nodes.forEach((o) => {
    const arr = o.dir.split("/");
    const _month = arr.at(-2);
    if (monthToCountMap[_month] == undefined) {
      monthToCountMap[_month] = 0;
    }
    monthToCountMap[_month] += 1;
  });
  // ordered by most recent
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
                    monthStr
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
    allFile {
      nodes {
        dir
      }
    }
  }
`;
