// pages/api/portfolio.ts
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const walletAddress = req.query.address as string;
  const apiKey = process.env.ZERION_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Basic ${apiKey}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.zerion.io/v1/wallets/${walletAddress}/portfolio?currency=usd`,
      options
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching portfolio data" });
  }
};

export default handler;
