cd ../contracts
solc --abi --bin --overwrite --optimize --optimize-runs 0 -o ../deployment/build TariInvestment.sol
cd ../deployment

echo -n "module.exports = '" > TariInvestment.bin.js
cat build/TariInvestment.bin >> TariInvestment.bin.js
echo "';" >> TariInvestment.bin.js

echo -n "module.exports = " > TariInvestment.abi.js
cat build/TariInvestment.abi >> TariInvestment.abi.js
echo ";" >> TariInvestment.abi.js

