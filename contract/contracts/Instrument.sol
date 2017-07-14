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
  Pool[] pools;
  mapping(address => Participant) private waitlist;
  mapping(address => uint) public pendingDividends;
  bool private stopped = false;
  address private owner;
  uint cost = 10;

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

  event Delete(
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

  function () payable {
    uint COST = 10 * (10 ** 18);
    Participant user = waitlist[msg.sender];

    // if (!user.verified) {
    //   LogEvent(msg.sender, user.startAge, "sender is not verified");
    //   throw;
    // }

    // if (user.added) {
    //   LogEvent(msg.sender, user.startAge, "sender is already participating");
    //   throw;
    // } 

    // if(msg.value < COST) {
    //   LogEvent(msg.sender, user.startAge, "did not meet buy-in criteria");
    //   throw;
    // }

    assert(!user.added);
    assert(user.verified);
    assert(msg.value >= COST);

    signContract(user);
  // function () public payable stopInEmergency {
  //   LogEvent(msg.sender, 0, "Donation or incorrect payment made to fallback function.");
  }
   /**

   */
  function signContract(Participant user) private {
    // uint index = poolForAge(user).participants.size;
    // poolForAge(user).participants.set(this, index, user);
    // uint COST = 50 ** 18;

  // function signContract() public payable stopInEmergency {
    // uint index = poolForAge(user).participants.size;
    // poolForAge(user).participants.set(this, index, user);
    // uint COST = 50 ** 18;
    uint COST = 10 * (10 ** 18);
    // Participant user = waitlist[msg.sender];

    // if (!user.verified) {
    //   LogEvent(msg.sender, user.startAge, "sender is not verified");
    //   throw;
    // }

    // if (user.added) {
    //   LogEvent(msg.sender, user.startAge, "sender is already participating");
    //   throw;
    // } 

    // if(msg.value < COST) {
    //   LogEvent(msg.sender, user.startAge, "did not meet buy-in criteria");
    //   throw;
    // }

    // if (block.timestamp > user.approvalDate + 1 years) {
    //   LogEvent(msg.sender, user.startAge, "approval is only valid for one year");
    //   delete waitlist[msg.sender];
    //   throw;
    // }
    
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
  
  /**

   */
  function earlyExit() public stopInEmergency {
    for (var p = 0; p < pools.length; p++) {
      if (IterableMapping.contains(pools[p].participants, msg.sender)) {
        
        // restrictions on early exit
        require(pools[p].midAge < 70);
        require(block.timestamp < waitlist[msg.sender].approvalDate + 5 years);

        // remove from pool
        IterableMapping.remove(pools[p].participants, msg.sender);

        // send money back
        uint invenstment = cost * (10 ** 18);
        pendingDividends[msg.sender] = (invenstment * 9) / 10;
        pendingDividends[owner] += invenstment / 10;
        pools[p].totalEth -= invenstment;

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
  function releaseDividends() public {
    for (var p = 0; p < pools.length; p++) {
      if(pools[p].midAge >= 70) {
        uint size = pools[p].participants.size;
        uint totalEth = pools[p].totalEth;
        for (var i = IterableMapping.iterate_start(pools[p].participants); IterableMapping.iterate_valid(pools[p].participants, i); i = IterableMapping.iterate_next(pools[p].participants, i)) {
          var (addr, _)  = IterableMapping.iterate_get(pools[p].participants, i);
          pendingDividends[addr] = totalEth / (size * 20);
        }
      }
      pools[p].midAge++;
    }
  }

  /**

   */
  function collectDividend() public stopInEmergency returns (bool) {
    var amount = pendingDividends[msg.sender];
      if (amount > 0) {
        pendingDividends[msg.sender] = 0;
        if (!msg.sender.send(amount)) {
          pendingDividends[msg.sender] = amount;
          return false;
        }

        // for (var p = 0; p < pools.length; p++) {
        //   if (IterableMapping.contains(pools[p].participants, addrs[i])) {
        //     pools[p].totalEth -= amount;
        //     break;
        //   }
        // }
      }

      return true;
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
