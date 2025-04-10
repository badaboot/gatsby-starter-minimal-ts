import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout";

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1>What does Anny do?</h1>
      <p>
        Anny is a writer, artist, and software engineer. She also{" "}
        <a href="/all">draws comics</a> and{" "}
        <a href="https://badaboot.itch.io/">makes games</a>.
      </p>
      <p>
        She was trilingual at age of twelve, having lived on three continents
        (Asia, Europe, and Canada). She currently resides in the United States
        with her husband and cat.
      </p>
      <p>
        She has an insatiable appetite for personal finance, technology + art,
        and clear writing. Anny holds a degree in Computing Science and Business
        Administration from Simon Fraser University.
      </p>
      <h3>You played the bagpipes?!</h3>
      <p>
        Yes I did for 7 years, from my teens to early twenties. I also traveled
        to Scotland to compete in 2008 in pipe band and solo competitions.
      </p>
      <p>
        This is a video me playing the Canadian anthem at Simon Fraser
        University.
      </p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/Fjt2zt7SoqU?si=f9NfWRQy1d98zDxz"
        title="YouTube video player"
        style={{ marginTop: 20 }}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>Why do I write this blog?</h3>
      <p>To express my thoughts clearly.</p>
      <p>
        There's value in publishing answers to frequently asked questions. It's
        pragmatic to clarify one's thoughts on paper and share the result.
      </p>
      <p>Happy reading!</p>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>Not found</title>;
