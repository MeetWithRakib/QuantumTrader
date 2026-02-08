// License validation API - UPDATED VERSION
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
        
        // VALID LICENSE KEY - CHANGE THIS TO YOUR OWN KEY
        const VALID_LICENSE_KEYS = [
            'QT-PRO-2024-78910'  // আপনার নিজের লাইসেন্স key দিন এখানে
        ];
        
        // Check if license key is valid
        const isValid = VALID_LICENSE_KEYS.includes(licenseKey);
        
        if (isValid) {
            res.json({
                valid: true,
                type: 'full',
                message: 'License activated successfully',
                timestamp: new Date().toISOString()
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

