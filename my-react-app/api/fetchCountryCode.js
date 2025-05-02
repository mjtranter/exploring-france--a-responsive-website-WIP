export default async function handler(req, res) {
    try {
        //const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
        const ip = req.headers["x-vercel-ip-country"];
        //const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
        //const data = await response.json();
        console.log(ip);
        res.status(200).json({ ip });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch country code" });
    }
}