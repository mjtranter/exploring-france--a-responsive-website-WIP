export default async function handler(req, res) {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Paris`);
        const data = await response.json();
        console.log(apiKey);
        console.log(data);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch weather" });
    }
}