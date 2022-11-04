'use strict';
const Moralis = require('moralis').default;
const { EvmChain } = require("@moralisweb3/evm-utils")

const MORALIS_API_KEY = "replace me";
const address = "replace me";
const chain = EvmChain.MUMBAI;

const startMoralis = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });
};

startMoralis();

module.exports.handler = async (event) => {
  
  // Get native balance
  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain,
  });

  // Format the native balance formatted in ether via the .ether getter
  const nativeBalanceEther = nativeBalance.result.balance.ether;
  
  return {
    result: nativeBalanceEther
  };
};
