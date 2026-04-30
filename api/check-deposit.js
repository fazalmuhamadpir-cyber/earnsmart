export default async function handler(req, res) {
  return res.status(200).json({
    success: true,
    status: "approved",
    message: "Check deposit API working"
  });
}
