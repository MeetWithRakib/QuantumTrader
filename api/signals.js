// Trading signals API (for demonstration)
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        const { symbol = 'BTCUSDT' } = req.query;
        
        // Demo signal generation
        const signal = generateDemoSignal(symbol);
        
        res.json({
            success: true,
            symbol,
            signal: signal.signal,
            confidence: signal.confidence,
            price: signal.price,
            timestamp: Date.now(),
            message: 'Signal generated successfully'
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to generate signal'
        });
    }
}

function generateDemoSignal(symbol) {
    const basePrices = {
        'BTCUSDT': 45000 + Math.random() * 10000,
        'ETHUSDT': 2500 + Math.random() * 1000,
        'BNBUSDT': 300 + Math.random() * 100,
        'SOLUSDT': 80 + Math.random() * 40
    };
    
    const price = basePrices[symbol] || 100 + Math.random() * 50;
    const isBuy = Math.random() > 0.5;
    
    return {
        signal: isBuy ? 'BUY' : 'SELL',
        confidence: Math.floor(60 + Math.random() * 35),
        price: price
    };
}