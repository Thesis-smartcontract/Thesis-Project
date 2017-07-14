pragma solidity ^0.4.4;

import "./IterableMapping.sol";
import "./UtilsLib.sol";

contract Instrument {

  /* Contract-specific structures */
  struct Participant {
    uint startAge;
    bool verified;
    bool added;
    uint approvalDate;
  }

  struct Pool {
    IterableMapping.itmap participants;
    uint totalEth;
    uint midAge;
  }

  /* Local variables */
  Pool[] private pools;
  mapping(address => Participant) private waitlist;
  address private owner;
  bool private stopped = false;

  /* Constants */

  /* Events */
  event LogEvent(
    address addr,
    uint value,
    string msg
  );

  event LogDelete(
    address addr,
    uint count,
    string msg
  );

  event Size(
    uint size
  );

  /* Modifiers */
  modifier costs(uint price) { if (msg.value >= price) _; }
  modifier stopInEmergency { if (!stopped) _; }
  modifier onlyInEmergency { if (stopped) _; }
  modifier adminOnly {
    require(msg.sender == owner);
    _;
  }
  // modifier checkInvariants {

  // }

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
  
  function pool(uint idx) public returns (uint participants, uint totalEth, uint midAge) {
    participants = pools[idx].participants.size;
    totalEth = pools[idx].totalEth;
    midAge = pools[idx].midAge;
  }
  /**

   */  
  function createPool(uint midAge) private {
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
  function verify(address addr, uint age) public {
    waitlist[addr].verified = true;
    waitlist[addr].startAge = age;
    waitlist[addr].added = false;
    waitlist[addr].approvalDate = block.timestamp;
    LogEvent(addr, age, "verified user");
  }

  function () public payable stopInEmergency {
    LogEvent(msg.sender, 0, "Donation or incorrect payment made to fallback function.");
  }
   /**

   */
  function signContract() public payable stopInEmergency {
    // uint index = poolForAge(user).participants.size;
    // poolForAge(user).participants.set(this, index, user);
    // uint COST = 50 ** 18;
    uint COST = 10 * (10 ** 18);
    Participant user = waitlist[msg.sender];

    if (!user.verified) {
      LogEvent(msg.sender, user.startAge, "sender is not verified");
      throw;
    }

    if (user.added) {
      LogEvent(msg.sender, user.startAge, "sender is already participating");
      throw;
    } 

    if(msg.value < COST) {
      LogEvent(msg.sender, user.startAge, "did not meet buy-in criteria");
      throw;
    }

    if (block.timestamp > user.approvalDate + 1 years) {
      LogEvent(msg.sender, user.startAge, "approval is only valid for one year");
      delete waitlist[msg.sender];
      throw;
    }
    
    user.verified = false;
    user.added = true;
    uint poolIdx = poolForAge(user.startAge);
    pools[poolIdx].totalEth += msg.value;
    IterableMapping.set(pools[poolIdx].participants, msg.sender, true);
  
    LogEvent(msg.sender, user.startAge, "new participant signed contract");
  }
  
  /**

   */
  function poolForAge(uint age) public returns (uint idx) {
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
  function earlyExit() public stopInEmergency {
    for (var p = 0; p < pools.length; p++) {
      if (IterableMapping.contains(pools[p].participants, msg.sender)) {
        IterableMapping.remove(pools[p].participants, msg.sender);
        // uint INVESTMENT = COST * (10 ** 18)
        // Logdelete waitlist[msg.sender]
        // dividends[msg.sender] = (.9 * INVESTMENT);
        // dividends[owner] = (.1 * INVESTMENT);

        LogDelete(msg.sender, 1, "removed user from pool"); 
        break;
      }
    }
  }
  
  /**
   Admin passes the contract a list of people to withdraw
   from program. The program will loop through 
   */
  function removeFromPool(address[] addrs) public {
    uint count = 0;
    for (var i = 0; i < addrs.length; i++) {
      //get pool
      for (var p = 0; p < pools.length; p++) {
        if (IterableMapping.contains(pools[p].participants, addrs[i])) {
          count++;
          IterableMapping.remove(pools[p].participants, addrs[i]);
          LogDelete(addrs[i], 1, "deleted user"); 
          break;
        }
      }
    }
    LogDelete(msg.sender, count, "deleted block of users");
  }


  /**

   */
  function releaseDividend() public {
    // TODO : release dividend, 
    // called by admin
    
  }

  /**

   */
  function collectDividend() public stopInEmergency {
    // TODO : collect dividend, 
    // called by user
  }
  
  /**

   */
  function selfDestruct() public adminOnly {
    // TODO : kill contract, return eth to users
    // admin

  }

  /**

   */
  function breakCircuit() public adminOnly {
    // TODO : kill contract, return eth to users
    // admin

  }
}
