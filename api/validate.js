// License validation API
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        const { licenseKey } = req.body;
        
        if (!licenseKey) {
            return res.status(400).json({
                valid: false,
                message: 'License key is required'
            });
        }
        
        // VALID LICENSE KEY - এখানে আপনার লাইসেন্স key দিন
        const VALID_LICENSE_KEYS = [
            'QT-PRO-2024-78910-ABCDE',  // আপনার মূল লাইসেন্স key
            'QT-TRIAL-2024-12345'       // ট্রায়াল key (ঐচ্ছিক)
        ];
        
        // Check if license key is valid
        const isValid = VALID_LICENSE_KEYS.includes(licenseKey);
        const isTrial = licenseKey.startsWith('QT-TRIAL');
        
        if (isValid) {
            res.json({
                valid: true,
                type: isTrial ? 'trial' : 'full',
                message: isTrial ? 'Trial license activated' : 'Full license activated',
                expires: isTrial ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null
            });
        } else {
            res.status(401).json({
                valid: false,
                message: 'Invalid license key'
            });
        }
        
    } catch (error) {
        console.error('License validation error:', error);
        res.status(500).json({
            valid: false,
            message: 'Server error during license validation'
        });
    }
}