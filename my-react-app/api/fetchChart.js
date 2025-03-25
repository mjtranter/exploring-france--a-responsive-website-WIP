export default async function handler(req, res) {
    try {
        const response = await fetch(`https://api.deezer.com/playlist/1109890291/tracks`);
        const data = await response.json();
        res.status(200).json(data.data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch top 10" });
    }
}