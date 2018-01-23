#!/bin/sh
cd ../contracts
solc --abi --bin --overwrite --optimize --optimize-runs 0 -o ../tari-testing-python/build/ TariInvestment.sol