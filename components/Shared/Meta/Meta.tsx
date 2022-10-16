import React from "react";

interface Props {
  title: string;
  description: string;
  url: string;
  imageURL: string;
}

const Meta: React.FC<Props> = ({ title, description, url, imageURL }) => {
  return (
    <>
      <title>Sanket Naik - Store</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageURL} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageURL} />
    </>
  );
};

export default Meta;
