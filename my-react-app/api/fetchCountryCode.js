export default async function handler(req, res) {
    try {
        const countryCode = req.headers["x-vercel-ip-country"];
        res.status(200).json(countryCode);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch country code" });
    }
}