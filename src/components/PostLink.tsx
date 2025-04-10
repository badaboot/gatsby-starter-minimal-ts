import React from "react";
import { Link } from "gatsby";

const PostLink = ({ post }) => (
  <div>
    <Link to={"/blog" + post.frontmatter.slug}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
  </div>
);

export default PostLink;
