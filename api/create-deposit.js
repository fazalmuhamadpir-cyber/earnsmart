export default function handler(req, res) {
  const { amount } = req.body;

  if (!amount || amount < 50) {
    return res.json({
      success: false,
      message: "Minimum deposit is 50 USDT"
    });
  }

  // 👇 tumhara wallet address (yahan apna real daalo)
  const WALLET = "0xYOUR_WALLET_ADDRESS";

  // 👇 exact random amount
  const exactAmount = (Number(amount) + Math.random()).toFixed(6);

  res.json({
    success: true,
    exactAmount,
    wallet: WALLET,   // ✅ IMPORTANT
    createdAt: Date.now()
  });
}
