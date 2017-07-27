import React from 'react';
import '../adminNavbar.css'

const UserData = ({filteredUserArr, clickHandler }) => {
  console.log(filteredUserArr)
  return (
    <div className="userData">
    <table>
      <thead>
        <tr>
           <th className="walletId">User's Wallet Address:</th>
          <th className="age">Submitted Age:</th>
          <th className="email">User's Email:</th> 
        </tr>
      </thead>
      <tbody>
        {
          filteredUserArr.map((user) => {
            return (<tr onClick={() => clickHandler(user.walletId)}>
              <td className="walletId"><label>{user.walletId}</label></td>
              <td className="age"><label>{user.startAge} yrs</label></td>
              <td className="email"><label>{user.email}</label></td>
            </tr>)
          }) 
        }  
      </tbody>
    </table>
    </div>
  );
};

export default UserData;