pragma solidity ^0.4.4;

import "./IterableMapping.sol";
import "./UtilsLib.sol";

contract Instrument {

  /* Contract-specific structures */
  struct Participant {
    uint startAge;
    bool verified;
    bool added;
  }

  struct Pool {
    IterableMapping.itmap participants;
    uint totalEth;
    uint midAge;
  }

  /* Local variables */
  Pool[] pools;
  mapping(address => Participant) waitlist;
  address owner;

  /* Events */
  event Log(
    address addr,
    uint age,
    string msg
  );

  event Delete(
    address addr,
    uint count,
    string msg
  );

  event Size(
    uint size
  );

  // struct Verify { address walletAdd; bool verified; }
  /**

   */
  function Instrument() {
    uint BASE = 20;
    uint GAP = 6;
    owner = msg.sender;
    for (var i = 0; i < 12; i++) {
      createPool((BASE + GAP / 2) + (GAP + 1) * i);
    }
  }
  
  function pool(uint idx) returns (uint participants, uint totalEth, uint midAge) {
    participants = pools[idx].participants.size;
    totalEth = pools[idx].totalEth;
    midAge = pools[idx].midAge;
  }
  /**

   */  
  function createPool(uint midAge) {
    // TODO : create a new pool for the collection
    // pools.push(Pool({
    //   participants: participants.set(this, 0, address),
    //   total: 1.
    //   midAge: midAge
    // }))
    Pool storage newPool;
    newPool.midAge = midAge;
    newPool.totalEth = 0;
    newPool.participants.size = 0;
    pools.push(newPool);
  }
  
  /**

   */
  function verify(address addr, uint age) {
    waitlist[addr].verified = true;
    waitlist[addr].startAge = age;
    waitlist[addr].added = false;
    Log(addr, age, "verified user");
  }

  function () payable {
    uint COST = 10 * (10 ** 18);
    Participant user = waitlist[msg.sender];

    if (!user.verified) {
      Log(msg.sender, user.startAge, "sender is not verified");
      throw;
    }

    if (user.added) {
      Log(msg.sender, user.startAge, "sender is already participating");
      throw;
    } 

    if(msg.value < COST) {
      Log(msg.sender, user.startAge, "did not meet buy-in criteria");
      throw;
    }
    
    signContract(user);
  }
   /**

   */
  function signContract(Participant user) private {
    // uint index = poolForAge(user).participants.size;
    // poolForAge(user).participants.set(this, index, user);
    // uint COST = 50 ** 18;

    
    user.verified = false;
    user.added = true;
    uint poolIdx = poolForAge(user.startAge);
    pools[poolIdx].totalEth += msg.value;
    IterableMapping.set(pools[poolIdx].participants, msg.sender, true);
  
    Log(msg.sender, user.startAge, "new participant signed contract");
  }
  
  /**

   */
  function poolForAge(uint age) returns (uint idx) {
    uint BASE = 20;
    uint GAP = 6;
    uint currentMid = BASE + GAP / 2;
    idx = 0;

    while (age > currentMid + GAP / 2 && idx < 12) {
      currentMid += GAP + 1;
      idx++;
    }
  }
    // function g(num) {
    //   i = 23;
    //   j = 0;
    //   while (i < 100) {
    //     if (num <= i + 3) {
    //       break;
    //     }
    //     i += 7;
    //     j++;
    //   }
    //   return j;
    // };
    
    // 
    // function f() {
    //   var arr = [];
    //   var SKIP = 6;
    //   i = 20;
    //   j = 26;
    //   for (let k = 0; k < 14; k++) {
    //     arr.push(JSON.stringify([i, j]));
    //     i = j + 1;
    //     j = i + 6;
    //   }
    //   return arr;
    // };

  
  /**

   */
  function earlyExit() {
    // TODO : logic for leaving early
    // user
  }
  
  /**
   Admin passes the contract a list of people to withdraw
   from program. The program will loop through 
   */
  function removeFromPool(address[] addrs) {
    uint count = 0;
    for (var i = 0; i < addrs.length; i++) {
      //get pool
      for (var p = 0; p < pools.length; p++) {
        if (IterableMapping.contains(pools[p].participants, addrs[i])) {
          count++;
          IterableMapping.remove(pools[p].participants, addrs[i]);
          Delete(addrs[i], 1, "deleted user"); 
          break;
        }
      }
    }
    Delete(msg.sender, count, "deleted block of users");
  }


  /**

   */
  function releaseDividend() {
    // TODO : release dividend, 
    // called by admin
    
  }

  function withdrawl(address[] addr) {
    // TODO : set the live boolean to false for these addr
    // for(uint i = 0; i < addr.length; i++) {
    //   for(uint j = 0; j < verified.length; j++) {
    //     if(addr[i] === verified[j].walletAdd) {
    //       verified[j].verified = false;
    //     }
    //   }
    // }
    
  }

  /**

   */
  function collectDividend() {
    // TODO : collect dividend, 
    // called by user
  }
  
  /**

   */
  function selfDestruct() {
    // TODO : kill contract, return eth to users
    // admin
  }
}
