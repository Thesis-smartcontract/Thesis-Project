pragma solidity ^0.4.4;

import "./IterableMapping.sol";
import "./UtilsLib.sol";

/** @title Gennuity: EthTech for social security */
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
  mapping(address => Participant) private verifiedUsers;
  mapping(address => uint) public pendingDividends;
  bool private stopped = false;
  address private owner;
  uint cost = 10;
  uint yearlyPoolCounter = 0;

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

  /**
   * @dev Creates the Gennuity contract.
   */
  function Instrument() {
    uint BASE = 20;
    uint GAP = 6;
    owner = msg.sender;
    for (var i = 0; i < 12; i++) {
      createPool((BASE + GAP / 2) + (GAP + 1) * i);
    }
  }
  
  /**
   * @dev Gives information about a specific pool.
   * @param idx Index for the pool of interest.
   * @return participants Number of users in the pool.
   * @return totalEth Collective amount of 
   * @return midAge
   */
  function pool(uint idx) public returns (uint participants, uint totalEth, uint midAge) {
    participants = pools[idx].participants.size;
    totalEth = pools[idx].totalEth;
    midAge = pools[idx].midAge;
  }

  /**
   * @dev Gives information about a specific pool.
   * @param idx Index for the pool of interest.
   * @return participants Number of users in the pool.
   * @return totalEth Collective amount of 
   * @return midAge
   */
  function createPool(uint midAge) private {
    Pool storage newPool;
    newPool.midAge = midAge;
    newPool.totalEth = 0;
    newPool.participants.size = 0;
    pools.push(newPool);
  }
  
  /**
   * @dev Admin verifies the age of the user after genomic test. Allows user
   *      to sign up for the contract.
   * @param addr Address to be verified.
   * @param age Age of the verified user. Reference for adding to pool, and 
   *        also allowing them to sign up only within one year. 
   */
  function verify(address addr, uint age) public {
    verifiedUsers[addr].verified = true;
    verifiedUsers[addr].startAge = age;
    verifiedUsers[addr].added = false;
    verifiedUsers[addr].approvalDate = block.timestamp;
    LogEvent(addr, age, "verified user");
  }

  /**
   * @dev Fallback function to recieve payments. Prevents any "donations"
   *      being sent to the contract because this a) costs gas, b) requires 10eth.
   */
  function () payable {
    uint COST = 10 * (10 ** 18);
    Participant user = verifiedUsers[msg.sender];

    assert(!user.added);
    assert(user.verified);
    assert(msg.value >= COST);

    signContract(user);
  }

  /**
   * @dev Adds a participant to the correct pool after a verified 
   *      user sends ether to invoke contract.
   * @param user The cleared user to be added.
   */
  function signContract(Participant user) private {
    uint COST = 10 * (10 ** 18);
    
    user.verified = false;
    user.added = true;
    uint poolIdx = poolForAge(user.startAge);
    pools[poolIdx].totalEth += msg.value;
    IterableMapping.set(pools[poolIdx].participants, msg.sender, true);
  
    LogEvent(msg.sender, user.startAge, "new participant signed contract");
  }
  
  /**
   * @dev Returns the index of the correct pool for a given age.
   * @param age Age of user we are concerned with.
   * @return idx The index of the pool users of this age are
   *         allocated to.
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
   * @dev A user can invoke this function if they want to exit the 
   *      contract, leave their pool and get their money back. Can only be
   *      invoked within 5 years of signing up, and if the pool is not 
   *      receiving dividends.
   */
  function earlyExit() public stopInEmergency {
    for (var p = 0; p < pools.length; p++) {
      if (IterableMapping.contains(pools[p].participants, msg.sender)) {
        
        // restrictions on early exit
        require(pools[p].midAge < 70);
        require(block.timestamp < verifiedUsers[msg.sender].approvalDate + 5 years);

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
   * @dev Admin passes a list of people who failed the genetic test.
   *      Will remove those users from pool and collect their unclaimed 
   *      dividends.
   * @param addrs Array of users to be removed.
   */
  function removeFromPool(address[] addrs) public {
    uint count = 0;
    for (var i = 0; i < addrs.length; i++) {
      for (var p = 0; p < pools.length; p++) {
        if (IterableMapping.contains(pools[p].participants, addrs[i])) {

          // remove user, revoke dividends
          IterableMapping.remove(pools[p].participants, addrs[i]);
          pendingDividends[owner] += pendingDividends[addr[i]];
          pendingDividends[addr[i]] = 0;

          LogDelete(addrs[i], 1, "deleted user");
          count++;
          break;
        }
      }
    }
    LogDelete(msg.sender, count, "deleted block of users");
  }


  /**
   * @dev Admin triggers yearly release of dividends for pools
   *      above the age threshold. This is used to increment the pool
   *      mid age, as well.
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
    poolYearlyCounter++;
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
