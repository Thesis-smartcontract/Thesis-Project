var Instrument = artifacts.require("./Instrument.sol");


contract('Instrument', (accounts) => {

  function balance(account) {
  return JSON.parse(web3.fromWei(web3.eth.getBalance(account)), "ether");
  };

  it("should get pool from user age", () => {
    var instrument;
    var pools = [11 , 11, 1,  0,  3,  2,  4,  6,  0, 12];
    var ages =  [100, 97, 33, 20, 41, 35, 50, 67, 0, 130];

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      var promises = ages.map(age => instrument.poolForAge.call(age));
      return Promise.all(promises);
    })
    .then(pools => {
      pools.forEach((pool, idx) => {
        assert.equal(pool.c[0], pools[idx], "Should correctly map from age to pool");
      });
    });
  });

  it("should create properly spaced pools", () => {
    var instrument;
    var poolIdx;
    var indices = [0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11];
    var midAges = [23, 30, 37, 44, 51, 58, 65, 72, 79, 86, 93, 100]

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      var promises = indices.map(idx => instrument.pool.call(idx));
      return Promise.all(promises);
    })
    .then((pools) => {
      pools.forEach((pool, idx) => {
        assert.equal(pool[2].c[0], midAges[idx], "Should create the correct spacing of pool ages");
      });
    });
  });
  
  it("should add user to pool", () => {
    var instrument;
    var poolIdx;
    var midAgeForPool = 72;
    var age = 69;
    var startingBalance = balance(accounts[0]);
    var price = 10;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;

      return instrument.verify(accounts[0], age, { from: accounts[0] });
    })
    .then(() => {
      return instrument.poolForAge.call(age);
    })
    .then((pool) => {
      poolIdx = pool.c[0];
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      // console.log("balance before signup", instrument);
      console.log("balance before signup", balance(accounts[0]));
      console.log("contract ether before signup", balance(instrument.contract.address));
      assert.equal(pool[0].c[0], 0, "Initial user number is incorrect");
      assert.equal(pool[2].c[0], midAgeForPool, "Did not place participant in the correct pool");
      return instrument.sendTransaction({ from: accounts[0], value: price * (10 ** 18) });
    })
    .then(() => {
      console.log("balance after signup vs expected", balance(accounts[0]), "|", startingBalance - 20);
      console.log("expected contract eth vs expected: ", price * 2, "|", balance(instrument.contract.address));
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      // console.log("pool", pool);
      assert.equal(pool[0].c[0], 1, "Failed to create user");
      // assert.equal(startingBalance - price, balance(accounts[0]), "Failed to withraw money from user");
      assert.equal(JSON.parse(pool[1]), price * (10 ** 18), "Failed to send money to contract");
      assert.equal(pool[2].c[0], midAgeForPool, "Did not place participant in the correct pool");
    })
    .catch(e => { 
      console.log(e);
      setStatus("Project funding didn't work");
    });
  });

  it("should delete from pool", () => {
    var instrument;
    var poolIdx;
    var midAgeForPool = 72;
    var age = 69;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;

      return instrument.verify(accounts[0], age, { from: accounts[0] });
    })
    .then(() => {
      return instrument.poolForAge.call(age);
    })
    .then((pool) => {
      poolIdx = pool.c[0];
      return instrument.pool.call(poolIdx);
    })
    .then(() => {
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      assert.equal(pool[0].c[0], 1, "Failed to create user");
      assert.equal(pool[2].c[0], midAgeForPool, "Did not place participant in the correct pool");
    })
    .then(() => {
      return instrument.removeFromPool([ accounts[0] ], { from: accounts[0] });
    })
    .then(() => {
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      assert.equal(pool[0].c[0], 0, "Did not delete participant");
      assert.equal(pool[2].c[0], midAgeForPool, "Did not place participant in the correct pool");
    })
  });

  it("should early exit with penalty", () => {
    var instrument;
    var poolIdx;
    var age = 21;

    return Instrument.deployed()
    .then((instance) => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      return instrument.earlyExit();
    })
    .then(() => {
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].participants.get(accounts[0]), 10000, "Failed to let user exit");
      assert.equal(pools[poolIdx].balance, 0, "Failed to return funds");
      // need to get fund's balance somehow
      assert.equal(web3.fromWei(web3.eth.getBalance(accounts[0])) , 0, "Failed to impose early exit penalty");
    });
  });

  it("should prevent exit after 5 year limit", () => {
    var instrument;
    var poolIdx;
    var age = 21;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      var promises = [];
      for (var i = 0; i < 5; i++) {
        promises.push(instrument.releaseDividends({ from: accounts[0] }));
      }
      return promises;
    })
    .then(() => {
      return instrument.earlyExit();
    })
    .then(() => {
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].participants.get(accounts[0]), true, "Failed to prevent 5yo user from exiting");
      // need to get fund's balance somehow
      assert.equal(pools[poolIdx].balance, 10000, "Should not let user leave with funds");
    });
  });

  it("should prevent exit if pool is recieving dividends", () => {
    var instrument;
    var poolIdx;
    var age = 69;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      return instrument.earlyExit();
    })
    .then(() => {
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].participants.get(accounts[0]), true, "Failed to prevent user over 65 (pool is collecting) from exiting");
    });
  });

  it("should be able to make dividend available", () => {
    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;
    var testAccount = "0x0f09879ab76195d325cfec0500cbde0ba2bc1f9d";
    console.log('ether', JSON.parse(web3.fromWei(web3.eth.getBalance(accounts[0])), "ether"));
    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.signContract({ from: testAccount }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      return instrument.releaseDividends({ from: accounts[0] });
    })
    .then(() => {
      return instrument.withdraw([ testAccount ])
    })
    .then(() => {
      return instrument.collectDividend({ from: accounts[0] });
    })
    .then(() => {
      return instrument.collectDividend({ from: testAccount });
    })
    .then(() => {
      // get balance of account[0]
      assert.equal(web3.fromWei(eth.getBalance(accounts[0])), 10000, "Failed to allocate dividend");
      // get balance of testAccount
      assert.equal(web3.fromWei(eth.getBalance(testAccount)), 10000, "Acccidentally allocated dividend to inactive user");
    });
  });

  it("should increment counter and pool's mid upon dividend calling", () => {

    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;
    var testAccount = "0x0f09879ab76195d325cfec0500cbde0ba2bc1f9d";
    var SKIP_YEARS = 5;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.signContract({ from: testAccount }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      var promises = [];
      for (var i = 0; i < SKIP_YEARS; i++) {
        promises.push(instrument.releaseDividends({ from: accounts[0] }));
      }
      return promises;
    })
    .then(() => {
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].midAge, midAgeForPool + SKIP_YEARS, "Failed to update pools timetable after dividend releases");
    });
  });

  // it("should allow users to withdraw after dividend is available", () => {
  //   return Instrument.deployed()
  //   .then(instance => {
  //     return instance.getBalance.call(accounts[0]);
  //   })
  //   .then((balance) => {
  //     assert.equal(balance.valueOf(), 10000, "User failed to receive dividend");
  //   });
  // });
});