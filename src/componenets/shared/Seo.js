import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title } ) => {
  
 title = title ? `${title} | this pArt` : 'this pArt';

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default SEO;
