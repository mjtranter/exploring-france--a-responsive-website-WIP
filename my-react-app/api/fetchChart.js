export default async function handler(req, res) {
    try {
        const api = process.env.LAST_FM_API_KEY;
        console.log(api);
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=france&api_key=${api}&format=json&limit=10`);
        const data = await response.json();

        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch top 10" });
    }
}