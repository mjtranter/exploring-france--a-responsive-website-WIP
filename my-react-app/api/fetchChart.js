export default async function handler(req, res) {
    try {
        const response = await fetch(`https://api.deezer.com/chart/FR/tracks`);
        const data = await response.json();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch top 10" });
    }
}