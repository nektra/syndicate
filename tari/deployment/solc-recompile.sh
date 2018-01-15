cd ../contracts
solc --abi --bin --overwrite --optimize --optimize-runs 0 -o ../deployment/build MultiSigWallet.sol
cd ../deployment

echo -n "module.exports = '" > MultiSigWallet.bin.js
cat build/MultiSigWallet.bin >> MultiSigWallet.bin.js
echo "';" >> MultiSigWallet.bin.js

echo -n "module.exports = " > MultiSigWallet.abi.js
cat build/MultiSigWallet.abi >> MultiSigWallet.abi.js
echo ";" >> MultiSigWallet.abi.js

