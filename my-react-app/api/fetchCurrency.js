export default async function handler(req, res) {
    try {
        const apiKey = process.env.CURRENCY_API_KEY;
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${req.query.currency}/EUR`);
        const data = await response.json();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch conversion rate" });
    }
}