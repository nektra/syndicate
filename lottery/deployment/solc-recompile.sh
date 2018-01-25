cd ../contracts
solc --abi --bin --overwrite --optimize --optimize-runs 0 -o ../deployment/build LotteryInvestment.sol
cd ../deployment

echo -n "module.exports = '" > LotteryInvestment.bin.js
cat build/LotteryInvestment.bin >> LotteryInvestment.bin.js
echo "';" >> LotteryInvestment.bin.js

echo -n "module.exports = " > LotteryInvestment.abi.js
cat build/LotteryInvestment.abi >> LotteryInvestment.abi.js
echo ";" >> LotteryInvestment.abi.js

