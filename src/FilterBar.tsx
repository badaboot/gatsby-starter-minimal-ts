import * as React from "react";
import { setQueryStringParameter } from "./utils";

export const FilterBar = ({
  folders,
  filter,
  setFilter,
}: {
  folders: string[];
  filter: string;
  setFilter: any;
}) => {
  return (
    <div className="filterBar">
      Filters:{" "}
      {folders.map((f) => {
        return (
          <span
            className={f === filter ? "selected" : "filter"}
            key={f}
            onClick={() => {
              setFilter(f);
              setQueryStringParameter("filter", f);
            }}
          >
            {f}
          </span>
        );
      })}{" "}
      <span
        className="clear"
        onClick={() => {
          setFilter("");
          // removes all queries
          window.history.pushState(null, "", window.location.pathname);
        }}
      >
        Clear
      </span>
    </div>
  );
};
