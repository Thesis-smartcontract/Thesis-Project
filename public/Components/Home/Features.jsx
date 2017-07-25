import React, { Component } from 'react';
import Feature from './Feature.jsx';

const Features = (props) => {
  let info = [
    {
      title: 'Transparency',
      glyph: 'fa fa-search',
      detail: `Contract source code is freely available on 
               github, as well as in our documentation.`
    },
    {
      title: 'Reliablity',
      glyph: 'fa fa-shield',
      detail: `The platform is self-executing. The only admin
               required is verifying user age with a genetic
               swab test, and triggering yearly dividends.`
    },
    {
      title: 'Security',
      glyph: 'fa fa-key',
      detail: `The contract is heavily tested within our
               own platform, as well as by leading 3rd party
               vendors. Built with circuit-break guards, 
               built-in upgrade mechanisms, and fail-safe
               self-destruct support.`
    },
    {
      title: 'Anonimity',
      glyph: 'fa fa-user-secret',
      detail: `An ether wallet is the only personal data 
               required. Genetic swabs are used to ensure age,
               but cannot be used to trace users.`
    },
  ];

  let features = info
    .map((feat, idx) => 
      <Feature 
        key={idx}
        glyph={feat.glyph}
        title={feat.title} 
        detail={feat.detail}
      />
    );

  return (
    <div className="features">
      <h1 className="title">Why Blockchain?</h1>
      <div className="features-grid">
        {features} 
      </div>
    </div>
  );
};

module.exports = Features;