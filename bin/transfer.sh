#!/bin/sh

curl -d '{"jsonrpc":"2.0","method":"eth_sendTransaction",
"params": [{"from":"0xe63f7bd8af07fca31c0204b5a41899f6ca85535e",
 "to":"0x9C9787B8a9b94c70Dd27fFAf58f5c02BFAfB7169", "value": 90e18}],
  "id":1}' -X POST http://gennuity.org:8545/