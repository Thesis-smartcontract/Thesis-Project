pragma solidity ^0.4.4;

import "./IterableMap.sol";

contract Instrument {

  /* Contract-specific structures */
  // struct Participant {
  //   address addr;
  //   uint startAge;
  // }

  struct Pool {
    IterableMap participants;
    uint totalEth;
    uint midAge;
  }

  /* Local variables */
  Pool[] pools;
  uint YEAR_GAP = 6; 
  uint cycleYear = 0;
  Verify[] verified;

  struct Verify { address walletAdd; bool verified; }
  /**

   */
  function Instrument() {
    // TODO : make contract
    // init, make pools, etc
  }
  
  /**

   */  
  function createPool(uint midAge) {
    // TODO : create a new pool for the collection
    pools.push(Pool({
      participants: participants.set(this, 0, address),
      total: 1.
      midAge: midAge
    }))
  }
  
  /**

   */
  function addToPool() {
    // TODO : add a new user to the correct 
    // pool in the pool collection
    // user
    uint index = poolForAge(user).participants.size;
    poolForAge(user).participants.set(this, index, user);
  }
  
  /**

   */
  function poolForAge(Participant storage self) {
    // TODO : find the right pool for a new participant
    // public

    for(uint i = 0; i < pools.length; i++) {
      if(pools[i].midAge + 5 > self.startAge && pools[i].midAge - 5 < self.startAge) {
        return pools[i];
        break;
      }
    }
  }
  
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
  function removeFromPool(address[] addr) {
    // TODO : set the live boolean to false for these addr
  }

  /**

   */
  function releaseDividend() {
    // TODO : release dividend, 
    // called by admin
  function withdrawl(address[] addr) {
    // TODO : set the live boolean to false for these addr
    for(uint i = 0; i < addr.length; i++) {
      for(uint j = 0; j < verified.length; j++) {
        if(addr[i] === verified[j].walletAdd) {
          verified[j].verified = false;
        }
      }
    }
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

