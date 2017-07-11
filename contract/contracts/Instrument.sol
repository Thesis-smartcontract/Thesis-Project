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
    uint total;
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
<<<<<<< HEAD
    //private
=======
    pools.push(Pool({
      participants: participants.set(this, 0, address),
      total: 1.
      midAge: midAge
    }))
>>>>>>> feature
  }
  
  /**

   */
  function addToPool() {
    // TODO : add a new user to the correct 
    // pool in the pool collection
<<<<<<< HEAD
    // user
=======
    uint index = poolForAge(user).participants.size;
    poolForAge(user).participants.set(this, index, user);
>>>>>>> feature
  }
  
  /**

   */
  function poolForAge(Participant storage self) {
    // TODO : find the right pool for a new participant
<<<<<<< HEAD
    // public
=======
    for(uint i = 0; i < pools.length; i++) {
      if(pools[i].midAge + 5 > self.startAge && pools[i].midAge - 5 < self.startAge) {
        return pools[i];
        break;
      }
    }
>>>>>>> feature
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
<<<<<<< HEAD
    // admin
=======

>>>>>>> feature
  }

  /**

   */
<<<<<<< HEAD
  function releaseDividend() {
    // TODO : release dividend, 
    // called by admin
=======
  function withdrawl(address[] addr) {
    // TODO : set the live boolean to false for these addr
    for(uint i = 0; i < addr.length; i++) {
      for(uint j = 0; j < verified.length; j++) {
        if(addr[i] === verified[j].walletAdd) {
          verified[j].verified = false;
        }
      }
    }
    
>>>>>>> feature
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

