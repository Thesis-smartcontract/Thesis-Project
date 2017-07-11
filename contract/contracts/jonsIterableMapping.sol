struct IterableMap {

  struct itmap {

    mapping(address => IndexValue) participant;

    KeyFlag[] keys;
    uint size;
  }

  struct IndexValue { uint keyIndex; bool value; }

  struct KeyFlag { uint key; bool deleted; }

  function set(itmap storage self, uint key, uint value) returns (bool replaced) {
    uint keyIndex = self.participant[key].keyIndex;
    self.participant[key].value = value;
    if (keyIndex > 0)
      return true;
    else {
      keyIndex = self.keys.length++;
      self.participant[key].keyIndex = keyIndex;
      self.keys[keyIndex].key = key;
      self.size++;
      return false;
    }
  }

  function delete(itmap storage self, uint key) returns (bool success) {
    uint keyIndex = self.participant[key].keyIndex;
    if (keyIndex == 0)
      return false;
    delete self.participant[key];
    self.keys[keyIndex - 1].deleted = true;
    self.size --;
  }

  function forEach(function()) {
    return self.participant[key].keyIndex > 0;
  }

  function get(itmap storage self, uint keyIndex) returns (uint key, uint value) {
    key = self.keys[keyIndex].key;
    value = self.participant[key].value;
  }
  
}