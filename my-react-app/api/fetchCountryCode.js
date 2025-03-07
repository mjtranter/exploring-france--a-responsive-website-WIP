export default async function handler(req, res) {
    try {
        const response = await fetch("http://ip-api.com/json/?fields=countryCode")
        const data = await response.json();
        console.log(data);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch country code" });
    }
}