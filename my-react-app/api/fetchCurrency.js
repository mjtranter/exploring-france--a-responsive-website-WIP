import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    try {
        const cacheKey = 'rate' + req.query.currency;
        const cachedRate = await kv.get(cacheKey);
        
        //check if data has already been read today
        if (cachedRate) {
            const timestamp = Date.now();
            const nextUpdated = cachedRate.time_next_update_unix;

            //include one minute buffer
            if (timestamp < nextUpdated + (1000 * 60)) {
                console.log('Using cached:', Boolean(cachedRate && timestamp < nextUpdated + 60000));
                return res.status(200).json(cachedRate);
            }
        }

        //otherwise fetch API key
        const apiKey = process.env.CURRENCY_API_KEY;
        
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${req.query.currency}/EUR`);
        const data = await response.json();

        await kv.set(cacheKey, data);

        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch conversion rate" });
    }
}