const USDT_BEP20 = "0x55d398326f99059ff775485246999027b3197955";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success:false });

  const { exactAmount, createdAt } = req.body;

  if (!exactAmount || !createdAt) {
    return res.status(400).json({ success:false, message:"Deposit data missing" });
  }

  const wallet = process.env.WALLET_ADDRESS?.toLowerCase();
  const apiKey = process.env.ETHERSCAN_API_KEY;

  const url =
    `https://api.etherscan.io/v2/api?chainid=56` +
    `&module=account&action=tokentx` +
    `&contractaddress=${USDT_BEP20}` +
    `&address=${wallet}` +
    `&page=1&offset=100&sort=desc&apikey=${apiKey}`;

  const r = await fetch(url);
  const data = await r.json();

  if (!Array.isArray(data.result)) {
    return res.status(500).json({ success:false, message:"Blockchain API error" });
  }

  const found = data.result.find(tx => {
    const to = String(tx.to || "").toLowerCase();
    const txTime = Number(tx.timeStamp) * 1000;
    const value = Number(tx.value) / Math.pow(10, Number(tx.tokenDecimal || 18));

    return (
      to === wallet &&
      Math.abs(value - Number(exactAmount)) < 0.000001 &&
      txTime >= Number(createdAt) - 10 * 60 * 1000
    );
  });

  if (!found) {
    return res.status(404).json({
      success:false,
      message:"Payment not found yet"
    });
  }

  return res.status(200).json({
    success:true,
    status:"approved",
    txid: found.hash,
    amount: Number(exactAmount).toFixed(6)
  });
}
