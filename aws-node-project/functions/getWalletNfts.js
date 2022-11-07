'use strict';
const Moralis = require('moralis').default;

const MORALIS_API_KEY = "replace me";

const startMoralis = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });
};

startMoralis();

module.exports.handler = async (event) => {
  // Get wallet NFTs
  const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    address: event.address,
    chain: event.chain
  });

  return {
    result: JSON.stringify(nfts)
  }
};
