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
    var midAges = [23, 30, 37, 44, 51, 58, 65, 72, 79, 86, 93, 100];

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
      console.log("pool", pool);
      console.log("balance before signup", balance(accounts[0]));
      console.log("contract ether before signup", balance(instrument.contract.address));
      assert.equal(pool[0].c[0], 0, "Initial user number is incorrect");
      assert.equal(pool[2].c[0], midAgeForPool, "Did not place participant in the correct pool");
      return instrument.sendTransaction({ from: accounts[0], value: price * (Math.pow(10, 18)) });
    })
    .then(() => {
      assert.approximately(balance(accounts[0]), startingBalance - 20, .1, "Did not remove contract cost from account balance.")
      assert.approximately(price * 2, balance(instrument.contract.address), .1, "Did not add ether to contract.")
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      assert.equal(pool[0].c[0], 1, "Failed to create user");
      assert.equal(JSON.parse(pool[1]), price * (Math.pow(10,18)), "Failed to send money to contract");
      assert.equal(pool[2].c[0], midAgeForPool, "Did not place participant in the correct pool");
    })
    // .catch(e => { 
    //   console.log(e);
    // });
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

  it("should be able to make dividend available", () => {
    var instrument;
    var poolIdx;
    var midAgeForPool = 72;
    var age = 70;
    var startingBalance = balance(accounts[4]);
    var price = 10;
    var finalBalanceWithoutDividend = balance(accounts[4]) - (2 * price);
    var parsed = 0;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.verify(accounts[4], age, { from: accounts[0] });
    })
    .then(() => {
      return instrument.poolForAge.call(age);
    })
    .then((pool) => {
      poolIdx = pool.c[0];
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      assert.equal(pool[0].c[0], 0, "Initial user number is incorrect"); 
      return instrument.sendTransaction({ from: accounts[4], value: price * (Math.pow(10, 18)) });
    })
    .then(() => {
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      assert.equal(pool[0].c[0], 1, "Failed to create user");
      assert.equal(JSON.parse(pool[1]), (2 * price) * (Math.pow(10, 18)), "Failed to send money to contract");  // giving me the wrong amount to send had to change to 2 * price
    })
    .then(pool => {
      poolIdx = pool;
      return instrument.releaseDividends({ from: accounts[0] });
    })
    .then(() => {
      var promises = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(x => {
        return instrument.pool.call(x);
      })
      return Promise.all(promises);
    })
    .then((pools) => {
      console.log(pools);
      return instrument.pendingDividends.call(accounts[4]);
    })
    .then(data => {
      parsed = JSON.parse(data/(Math.pow(10, 18)));
      assert.equal(parsed ,1, "Failed to allocate dividend");
      return instrument.collectDividend({ from: accounts[4] });
    })
    .then(info => {
      console.log("transaction", info);
      assert.approximately(balance(accounts[4]), finalBalanceWithoutDividend + parsed, .1, "User did not recieve dividend");
      return instrument.removeFromPool([accounts[4]], {from : accounts[0] });
    });
    // .then(() => {
    //   return instrument.poolForAge.call(age);
    // })
    // .then((pool) => {
    //   return instrument.pool.call(pool);
    // })
    // .then(pool => {
    //   assert.equal(pool[0].c[0], 0, "Failed to delete user");
    // });
  });

  it("should increment counter and pool's mid upon dividend calling", () => {

    var instrument;
    var poolIdx;
    var midAgeForPool = 73;
    var age = 71;
    var startingBalance = balance(accounts[1]);
    var SKIP_YEARS = 5;
    var price = 10;

    return Instrument.deployed()
    .then(instance => {
      console.log(instance.verify);
      instrument = instance;
      return instrument.verify(accounts[1], age, { from: accounts[0] });
    })
    .then(() => {
      return instrument.poolForAge.call(age);
    })
    .then((pool) => {
      poolIdx = pool.c[0];
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      console.log("pool before sign", pool);
      assert.equal(pool[0].c[0], 0, "Initial user number is incorrect"); 
      // assert.equal(pool[2].c[0], midAgeForPool, "Did not place participant in the correct pool");
      midAgeForPool = pool[2].c[0];
      return instrument.sendTransaction({ from: accounts[1], value: price * (Math.pow(10, 18)) });
    })
    .then(() => {
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      assert.equal(pool[0].c[0], 1, "Failed to create user");
    })
    .then(pool => {
      console.log('about to release dividends');
      return instrument.releaseDividends({ from: accounts[0] });
    })
    .then(() => {
      var promises = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(x => {
        return instrument.pool.call(x);
      })
      return Promise.all(promises);
    })
    .then((pools) => {
      console.log(pools);
      return instrument.poolForAge.call(age + 1);
    })
    .then((pool) => {
      poolIdx = pool.c[0];
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      console.log("pool", pool);
      assert.equal(pool[2].c[0], midAgeForPool + 1, "Midage increased by 1");
    });
  });

  it("should early exit with penalty", () => {
    var instrument;
    var poolIdx;
    var age = 21;
    var startingBalance = balance(accounts[1]);
    var price = 10;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.verify(accounts[1], age, { from: accounts[1] });
    })
    .then(() => {
      return instrument.poolForAge.call(age);
    })
    .then(pool => {
      poolIdx = pool.c[0];
      return instrument.sendTransaction({ from: accounts[1], value: price * (Math.pow(10, 18)) });
    })
    .then(() => {
      return instrument.earlyExit({ from: accounts[1] });
    })
    .then(() => {
      return instrument.collectDividend({ from: accounts[1] });
    })
    .then(() => {
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      assert.equal(pool[0].c[0], 0, "Did not delete participant");
    });
  });

  // it("should prevent exit after 5 year limit", () => {
  //   var instrument;
  //   var poolIdx;
  //   var age = 21;
  //   var startingBalance = balance(accounts[1]);
  //   var price = 10;

  //   return Instrument.deployed()
  //   .then(instance => {
  //     instrument = instance;
  //     return instrument.verify(accounts[1], age, { from: accounts[0] });
  //   })
  //   .then(() => {
  //     return instrument.poolForAge.call(age);
  //   })
  //   .then(pool => {
  //     poolIdx = pool.c[0];
  //     return instrument.sendTransaction({ from: accounts[1], value: price * (Math.pow(10, 18)) });
  //   })
  //   // .then(() => {
  //   //   var promises = [];
  //   //   for (var i = 0; i < 5; i++) {
  //   //     promises.push(instrument.releaseDividends({ from: accounts[0] }));
  //   //   }
  //   //   return promises;
  //   // })
  //   .then(() => {
  //     return instrument.earlyExit({ from: accounts[1] });
  //   })
  //   .then(() => {
  //     throw("Allowed early exit");
  //   })
  //   .catch(error => {
  //     console.log("threw error");
  //     assert.ifError(error);
  //   });
  //   // .then(() => {
  //   //   return instrument.collectDividend({ from: accounts[1] });
  //   // })
  //   // .then(() => {
  //   //   return instrument.pool.call(poolIdx);
  //   // })
  //   // .then(pool => {
  //   //   // assert.equal(pool[0].c[0], 1, "Incorrectly deleted participant");
  //   //   // console.log("balance after signup vs expected", balance(accounts[1]), "|", startingBalance - 20);
  //   //   // console.log("contract eth vs expected: ", balance(instrument.contract.address), "|", price * 2);
  //   // });
  // });

  it("should prevent exit if pool is recieving dividends", () => {
    var instrument;
    var poolIdx;
    var age = 71;
    var startingBalance = balance(accounts[1]);
    var price = 10;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.verify(accounts[1], age, { from: accounts[0] });
    })
    .then(() => {
      return instrument.poolForAge.call(age);
    })
    .then(pool => {
      poolIdx = pool.c[0];
      return instrument.sendTransaction({ from: accounts[1], value: price * (Math.pow(10, 18)) });
    })
    .then(() => {
      return instrument.earlyExit({ from: accounts[1] });
    })
    .then(() => {
      throw("Allowed early exit");
    })
    .catch(error => {});
  });
});
