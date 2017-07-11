/// @dev Models a uint -> uint mapping where it is possible to iterate over all keys.
struct IterableMapping {
  //struct are custom defined/new types that can group several variables
  struct itmap {
    // is a type mapping(_KeyType => _ValueType) 
    // keyType can be any type except for a mapping type, dynamically sized array, a contract, an enum and a struct
    // valueType can be any type including mappings the default value is "zero state" of whatever type is defined
    // keyType data is not actually stored only its keccak256 hash which is used to look up the value. So its essentially replacing the key
    // mapping do not have a length or a concept of a key or value being "set"
    // only allowed for state variables or as storage references types in internal functions
    // setting mapping to public you can use a getter. Ex: return Mapper Example(<address>).balances(this)
    mapping(uint => IndexValue) data;
    //KeyFlag is the types in the array. An empty [] indicates its has a dynamic size
    KeyFlag[] keys;
    uint size;
  }

  struct IndexValue { uint keyIndex; uint value; }

  struct KeyFlag { uint key; bool deleted; }

  // function (<parameter types>) internal|external [constant] [payable] [returns (<return types>)]
  // functions are default 
  function insert(itmap storage self, uint key, uint value) returns (bool replaced) {
    uint keyIndex = self.data[key].keyIndex;
    self.data[key].value = value;
    if (keyIndex > 0)
      return true;
    else {
      keyIndex = self.keys.length++;
      self.data[key].keyIndex = keyIndex + 1;
      self.keys[keyIndex].key = key;
      self.size++;
      return false;
    }
  }

  function remove(itmap storage self, uint key) returns (bool success) {
    uint keyIndex = self.data[key].keyIndex;
    if (keyIndex == 0)
      return false;
    delete self.data[key];
    self.keys[keyIndex - 1].deleted = true;
    self.size --;
  }

  function contains(itmap storage self, uint key) returns (bool) {
    return self.data[key].keyIndex > 0;
  }

  function iterate_start(itmap storage self) returns (uint keyIndex) {
    return iterate_next(self, uint(-1));
  }

  function iterate_valid(itmap storage self, uint keyIndex) returns (bool) {
    return keyIndex < self.keys.length;
  }

  function iterate_next(itmap storage self, uint keyIndex) returns (uint r_keyIndex) {
    keyIndex++;
    while (keyIndex < self.keys.length && self.keys[keyIndex].deleted)
      keyIndex++;
    return keyIndex;
  }

  function iterate_get(itmap storage self, uint keyIndex) returns (uint key, uint value) {
    key = self.keys[keyIndex].key;
    value = self.data[key].value;
  }
}

// How to use it:
// contract User
// {
//   // Just a struct holding our data.
//   IterableMapping.itmap data;
//   // Insert something
//   function insert(uint k, uint v) returns (uint size)
//   {
//     // Actually calls itmap_impl.insert, auto-supplying the first parameter for us.
//     IterableMapping.insert(data, k, v);
//     // We can still access members of the struct - but we should take care not to mess with them.
//     return data.size;
//   }
//   // Computes the sum of all stored data.
//   function sum() returns (uint s)
//   {
//     for (var i = IterableMapping.iterate_start(data); IterableMapping.iterate_valid(data, i); i = IterableMapping.iterate_next(data, i))
//     {
//         var (key, value) = IterableMapping.iterate_get(data, i);
//         s += value;
//     }
//   }
// }
