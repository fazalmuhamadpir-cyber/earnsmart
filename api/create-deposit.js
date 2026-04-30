export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success:false });

  const { amount } = req.body;
  const base = Number(amount);

  if (!base || base < 50) {
    return res.status(400).json({ success:false, message:"Minimum 50 USDT" });
  }

  const unique = Math.floor(100001 + Math.random() * 899998);
  const exactAmount = (base + unique / 1000000).toFixed(6);

  return res.status(200).json({
    success: true,
    exactAmount,
    createdAt: Date.now(),
    wallet: process.env.WALLET_ADDRESS
  });
}
