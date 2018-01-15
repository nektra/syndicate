## Deployment notes

Deployment of this multisig contract requires the solidity compiler to be available in the `PATH` environment variable as `solc`.

To deploy, execute `cd deployment; solc-recompile.sh && node improv_deploy.js`.

## ABI generation

Generating the ABI only requires executing `cd deployment; solc-recompile.sh`. The ABI is stored in `deployment/build` in json format.