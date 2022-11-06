import React from "react";
import Head from "next/head";
import { Layout, Section } from "../components";

const Home = () => {
  return (
    <>
      <Head>
        <title>DU Capstone</title>
        <meta
          name="description"
          content="Capstone project for Digital University Dev Team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Section>
          {/*
            PAGE CONTENT GOES HERE
          */}
        </Section>
      </Layout>
    </>
  );
};

export default Home;
