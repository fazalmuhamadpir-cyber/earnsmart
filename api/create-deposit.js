export default function handler(req, res) {
  const { amount } = req.body;

  if (!amount || amount < 50) {
    return res.json({
      success: false,
      message: "Minimum deposit is 50 USDT"
    });
  }

  // ✅ tumhara wallet address
  const WALLET = "0x22879e7dbcb2e6d2e1381dc8ff094cb75fb08e0c";

  // ✅ exact random amount generate
  const exactAmount = (Number(amount) + Math.random()).toFixed(6);

  res.json({
    success: true,
    exactAmount,
    wallet: WALLET,
    createdAt: Date.now()
  });
}
