pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TestMapping.sol";

contract TestIterableMap {

  function testCanSetAndGetParticipant() {
    IterableMapping.itmap testMap;
    address testAddr = msg.sender;

    IterableMapping.set(testMap, testAddr, true);
    bool res = IterableMapping.get(testMap, testAddr);
    
    Assert.equal(res, true, "Iterable map should set participant");
  }

  function testCanRemoveParticipant() {
    IterableMapping.itmap testMap;
    address testAddr = msg.sender;

    IterableMapping.set(testMap, testAddr, true);
    bool res1 = IterableMapping.get(testMap, testAddr);

    Assert.equal(res1, true, "Iterable map should set participant");

    IterableMapping.remove(testMap, testAddr);
    bool res2 = IterableMapping.get(testMap, testAddr);

    Assert.equal(res2, false, "Iterable map should delete participant");
  }

  function testCanIterateOverParticipants() {
    IterableMapping.itmap testMap;
    address testAddr1 = msg.sender;
    uint count = 0;
    uint expectedCount = 1;
    IterableMapping.set(testMap, testAddr1, true);

    for (var i = IterableMapping.iterate_start(testMap); IterableMapping.iterate_valid(testMap, i); i = IterableMapping.iterate_next(testMap, i)) {
      var (key, value) = IterableMapping.iterate_get(testMap, i);
      count++;
    }

    Assert.equal(count, expectedCount, "Iterable map should be able to iterate");
  }

  function testItermapIntegration() {
    IterableMapping.itmap testMap;
    address testAddr1 = msg.sender;
    uint count = 0;
    uint expectedCount = 1;
    
    IterableMapping.set(testMap, testAddr1, true);
    bool res1 = IterableMapping.get(testMap, testAddr1);
    Assert.equal(res1, true, "Should add and get user");

    for (var i = IterableMapping.iterate_start(testMap); IterableMapping.iterate_valid(testMap, i); i = IterableMapping.iterate_next(testMap, i)) {
      var (key, value) = IterableMapping.iterate_get(testMap, i);
      count++;
      Assert.equal(value, true, "Iterate value returned should be true");
      IterableMapping.remove(testMap, key);
      bool res2 = IterableMapping.get(testMap, key);
      Assert.equal(res2, false, "Should have deleted key from iterate");
    }

    Assert.equal(count, expectedCount, "Iterable map should be able to iterate");
  }
}
