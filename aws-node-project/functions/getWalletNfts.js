'use strict';
const Moralis = require('moralis').default;
const { EvmChain } = require("@moralisweb3/evm-utils")

const address = "0xEaB4694375055D1C5D84C35Ee543D5b656980073";
const chain = EvmChain.MUMBAI;

const startMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
};

startMoralis();

module.exports.handler = async (event) => {
  // Get wallet NFTs
  const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
  });

  return nfts;
};
