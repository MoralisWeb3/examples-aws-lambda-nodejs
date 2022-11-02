const serverless = require("serverless-http");
const express = require("express");
const Moralis = require('moralis').default;
const { EvmChain } = require("@moralisweb3/evm-utils")

const app = express();

const address = "0xEaB4694375055D1C5D84C35Ee543D5b656980073";
const chain = EvmChain.MUMBAI;

const startMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
};

startMoralis();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/getNativeBalance", async (req, res, next) => {
  try {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain,
    });

    // Format the native balance formatted in ether via the .ether getter
    const nativeBalanceEther = nativeBalance.result.balance.ether;

    res.status(200);
    res.json(nativeBalanceEther);

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

app.get("/getWalletNfts", async (req, res, next) => {
  try {
    // Get wallet NFTs
    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    res.status(200);
    res.json(nfts);

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

module.exports.handler = serverless(app);
