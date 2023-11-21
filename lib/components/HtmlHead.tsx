import Head from "next/head";

const HtmlHead = () => {
  const title = "Hydropower Dams Interactive Map | International Rivers";
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="The Sub-Saharan African Hydropower Dams Map is an ongoing project mapping prospective and existing dams across the region. It details financial, environmental and social consequences of the projects."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="og:title" content={title} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HtmlHead;
