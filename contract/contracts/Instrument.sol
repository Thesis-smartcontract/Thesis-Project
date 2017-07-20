pragma solidity ^0.4.4;

import "./IterableMapping.sol";

/** @title Gennuity: EthTech for Social Security */
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
  bool stopped = false;
  address owner;

  /* Constants */
  uint cost = 10;
  uint poolShiftCounter = 0;
  uint poolGap = 6;
  uint minAge = 20;

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
    owner = msg.sender;
    for (var i = 0; i < 12; i++) {
      createPool((minAge + poolGap / 2) + (poolGap + 1) * i);
    }
  }
  
  /**
   * @dev Gives information about a specific pool.
   * @param idx Index for the pool of interest.
   * @return participants Number of users in the pool.
   * @return totalEth Collective amount of 
   * @return midAge
   */
  function pool(uint idx)
    public
    returns (uint participants,
             uint totalEth,
             uint midAge) {
    participants = pools[idx].participants.size;
    totalEth = pools[idx].totalEth;
    midAge = pools[idx].midAge;
  }

  /**
   * @dev Creates and pushes new pool to the pools array.
   * @param midAge The middle age for the pool to be created.
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
    LogEvent(msg.sender, msg.value, "message value");
    Participant user = verifiedUsers[msg.sender];
    assert(!user.added);
    assert(user.verified);
    assert(msg.value >= 10 * (10 ** 18));

    signContract(user);
  }

  /**
   * @dev Adds a participant to the correct pool after a verified 
   *      user sends ether to invoke contract.
   * @param user The cleared user to be added.
   */
  function signContract(Participant user) private {
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
    idx = 0;
    for (var p = 0; p < pools.length; p++) {
      if (pools[p].midAge + 3 >= age && pools[p].midAge - 3 <= age) {
        idx = p;
        break;
      }
    }
  }

    /**
   * @dev Returns the index of the correct pool for a given user address
   * @return idx The index of the pool user of this address is
   *         allocated to.
   */
  function poolForAddress() public returns (uint idx, bool found) {
    found = false;
    for (var p = 0; p < pools.length; p++) {
      if (IterableMapping.contains(pools[p].participants, msg.sender)) {
        idx = p;
        found = true;
        break;
      }
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
        uint investment = 10 * (10 ** 18);
        pendingDividends[msg.sender] = (investment * 9) / 10;
        pendingDividends[owner] += investment / 10;
        pools[p].totalEth -= investment;

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
          pendingDividends[owner] += pendingDividends[addrs[i]];
          pendingDividends[addrs[i]] = 0;

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
      // shift pool's midAge
      pools[p].midAge++;
    }
    // checkForNewPool();
  }
  
  /**
   * @dev As old pools end, new pools will be created. Checks the current 
   *      gap, and will shift the entire array of pools before adding a new 
   *      one at the beginning. 
   */
  function checkForNewPool() private stopInEmergency {
    if (pools[0].midAge == (minAge + 1 + (poolGap / 2))) {
      for (var i = pools.length - 1; i > 0; i--) {
        pools[i] = pools[i - 1];
      }
      Pool storage newPool;
      newPool.midAge = minAge - (poolGap / 2);
      newPool.totalEth = 0;
      newPool.participants.size = 0;
      pools[0] = newPool;
    }
  }

  /**
   * @dev A user can attempt to collect their dividends. It is
   *      recommended to test the availablility with a call before
   *      envoking a transfer.
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
   * @dev This will pause the contract. Triggers the program
   *      emergency state that locks down most functions.
   */
  function breakCircuit() public adminOnly {
    // TODO : kill contract, return eth to users
    // admin
    stopped = true;
    
  }

  /**
   * @dev Called when updating the terms of the contract. Migrates
   *      the funds and user data to the new contact address. 
   */
  // function upgradeContractTransfer(address newContract) 
  //   public adminOnly 
  //   returns (Pool[] pools, 
  //           mapping(address => Participant) verifiedUsers,
  //           mapping(address => uint) pendingDividends,
  //           uint poolShiftCounter) {

  // }

  /**
   * @dev This will destroy the contract, and return funds to the
   *      owner. Can be called in emergency to prevent user funds from
   *      being siphoned if admin access is comprimised.
   */
  function selfDestruct() public adminOnly {
    selfdestruct(owner);
  }
}
