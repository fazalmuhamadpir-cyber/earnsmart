export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }

  const { uid, amount } = req.body;

  if (!uid || amount < 50) {
    return res.status(400).json({ success: false });
  }

  const unique = Math.floor(Math.random() * 999999);
  const exactAmount = (Number(amount) + unique / 1000000).toFixed(6);

  return res.status(200).json({
    success: true,
    depositId: Date.now().toString(),
    exactAmount: exactAmount
  });
}
