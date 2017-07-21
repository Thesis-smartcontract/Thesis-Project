import React, { Component } from 'react';

class TokenDetail extends Component {
  render() {
    return (
<div className="scroll-point" id="token-details">
    <section className="token-details py-4">
        <div className="container">
            <div className="row">
                <div className>
                    <h2 className="mb-4">Token distribution</h2>
                    <p className="lead">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore 
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </p>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation
                    </p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Transaction</th>
                                <th className="text-right">Ether sent</th>
                                <th className="text-right">Total Ether sent</th>
                                <th className="text-right">GENNUITY received</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#1</td>
                                <td className="text-right">1.000&nbsp;<small>ETH</small></td>
                                <td className="text-right">1.000&nbsp;<small>ETH</small></td>
                                <td className="text-right">101.000&nbsp;<small>GENNUITY</small></td>
                            </tr>
                            <tr>
                                <td>#2</td>
                                <td className="text-right">3.000&nbsp;<small>ETH</small></td>
                                <td className="text-right">4.000&nbsp;<small>ETH</small></td>
                                <td className="text-right">304.000&nbsp;<small>GENNUITY</small></td>
                            </tr>
                            <tr>
                                <td>#3</td>
                                <td className="text-right">0.005&nbsp;<small>ETH</small></td>
                                <td className="text-right">4.005&nbsp;<small>ETH</small></td>
                                <td className="text-right">0.500&nbsp;<small>GENNUITY</small></td>
                            </tr>
                            <tr>
                                <td>#4</td>
                                <td className="text-right">0.500&nbsp;<small>ETH</small></td>
                                <td className="text-right">4.505&nbsp;<small>ETH</small></td>
                                <td className="text-right">54.505&nbsp;<small>GENNUITY</small></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>
          </div>
      </section>
    </div>
    )
  }
}

export default TokenDetail;