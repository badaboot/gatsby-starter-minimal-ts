import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout";

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1>What does Anny do?</h1>
      <p>
        Anny is a <b>software engineer</b>, <b>writer</b>, and <b>artist</b>.
        She also <a href="/all">draws comics</a> and{" "}
        <a href="https://badaboot.itch.io/">makes games</a>.
      </p>
      <p>Some of her professional accomplishments include:</p>
      <ol>
        <li>
          Was the first engineer on a{" "}
          <a href="https://github.com/salesforce/refocus">
            real-time monitoring application
          </a>{" "}
          at <b>Salesforce</b>. Built the app from scratch, added automated
          testing, and shipped to support 2000+ users
        </li>
        <li>
          Created and shipped a foundational workflow platform at{" "}
          <b>LegalZoom</b> for the tax season in 6 months for 5000+ users. Won{" "}
          <b>Customer Experience</b> award thanks to a jump in NPS score (-18 to
          58)
        </li>
        <li>
          Created <b>#financial-buddy</b> at Splunk, a self-sustaining{" "}
          <b>financial-literacy</b> group with 250+ members
        </li>
        <li>
          Spoke at Salesforce's <b>Dreamforce</b> and Splunk's <b>.conf</b> on
          technical and ERG topics
        </li>
      </ol>
      <p>
        She was trilingual at age of twelve, having lived on three continents
        (Asia, Europe, and Canada). She currently resides in the United States
        with her husband and cat.
      </p>
      <p>
        She has an insatiable appetite for personal finance, technology + art,
        and clear writing.
      </p>
      <p>
        Anny holds a degree in Computing Science and Business Administration
        from Simon Fraser University.
      </p>
      <h3>You played the bagpipes?</h3>
      <p>
        I did for 7 years, from my teens to early twenties. I also traveled to
        Scotland to compete in 2008 in pipe band and solo competitions.
      </p>
      <p>
        This is a video me playing the Canadian anthem at Simon Fraser
        University, where I first encountered bagpipes.
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
      <h3>Why do you write?</h3>
      <p>To express my thoughts clearly.</p>
      <p>
        There's value in publishing answers to frequently asked questions, to
        clarify one's thoughts and share the result.
      </p>
      <p>Happy reading!</p>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>Not found</title>;
