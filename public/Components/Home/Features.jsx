import React, { Component } from 'react';
import Feature from './Feature.jsx';

const Features = (props) => {
  let info = [
    {
      title: 'Transparency',
      detail: `Contract source code and testing is freely 
               avaiable on github.`
    },
    {
      title: 'Reliablity',
      detail: `The platform is self-executing. The only admin
               required is verifying user age with a genetic
               swab test, and triggering yearly dividends.`
    },
    {
      title: 'Security',
      detail: `The contract is heavily tested within our
               own platform, as well as leading 3rd party
               vendors. Built with circuit-break guards, 
               built-in upgrade mechanisms, and fail-safe
               self-destruct support.`
    },
    {
      title: 'Anonymity',
      detail: `Your ether wallet is the only personal data we 
               require. Yuor genetic swabs are usedto ensure age,
               but cannot be used to trace users.`
    },
  ];

  let features = info
    .map((feat, idx) => 
      <Feature 
        key={idx}
        title={feat.title} 
        detail={feat.detail}
      />
    );

  return (
    <div className="features">
      {features}
    </div>
  );
};

module.exports = Features;