import React from "react";
import Head from "next/head";
import { Layout, Section, Text } from "../components";
import { fontWeight } from "../theme";

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
          <Text fontWeight={fontWeight.bold}>My Library</Text>
        </Section>
      </Layout>
    </>
  );
};

export default Home;
