export default async function handler(req, res) {
    try {
        const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
        console.log(ip);
        const response = await fetch("http://ip-api.com/json/?fields=countryCode")
        const data = await response.json();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch country code" });
    }
}