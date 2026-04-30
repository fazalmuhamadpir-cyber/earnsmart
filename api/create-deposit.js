export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount } = req.body;

  if (!amount || amount < 50) {
    return res.status(400).json({ error: "Minimum 50 USDT" });
  }

  // TEMP auto success
  return res.status(200).json({
    success: true,
    message: "Deposit created",
    amount
  });
}
