'use strict';
const Moralis = require('moralis').default;
const { EvmChain } = require("@moralisweb3/evm-utils")

const MORALIS_API_KEY = "replace me";
const address = "replace me";
const chain = EvmChain.ETHEREUM;

const startMoralis = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });
};

startMoralis();

module.exports.handler = async (event) => {
  // Get wallet NFTs
  const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
  });

  return {
    result: nfts
  }
};
