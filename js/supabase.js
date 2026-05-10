// Supabase Configuration
// Runtime-friendly configuration for static hosting (with safe defaults)

const DEFAULT_SUPABASE_URL = 'https://yyvciloshdtkdtiidepn.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_xAMAJYfDOOxCalTWCjO1Pw_pC6iR-ws';

function getRuntimeConfigValue(key, fallback) {
    if (typeof window !== 'undefined') {
        if (window.__EC_CONFIG__ && window.__EC_CONFIG__[key]) {
            return window.__EC_CONFIG__[key];
        }
        const metaTag = document.querySelector(`meta[name="${key}"]`);
        if (metaTag?.content) {
            return metaTag.content;
        }
    }
    return fallback;
}

const SUPABASE_URL = getRuntimeConfigValue('NEXT_PUBLIC_SUPABASE_URL', DEFAULT_SUPABASE_URL);
const SUPABASE_ANON_KEY = getRuntimeConfigValue('NEXT_PUBLIC_SUPABASE_ANON_KEY', DEFAULT_SUPABASE_ANON_KEY);

// Supabase Client Initialization
class SupabaseClient {
    constructor(url, anonKey) {
        this.url = url;
        this.anonKey = anonKey;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${anonKey}`,
            'apikey': anonKey
        };
    }

    // Get table data
    async getTable(tableName) {
        try {
            const response = await fetch(
                `${this.url}/rest/v1/${tableName}`,
                {
                    method: 'GET',
                    headers: this.headers
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching table:', error);
            return null;
        }
    }

    // Insert data into table
    async insertData(tableName, data) {
        try {
            const response = await fetch(
                `${this.url}/rest/v1/${tableName}`,
                {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify(data)
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error inserting data:', error);
            return null;
        }
    }

    // Upload file to storage
    async uploadFile(bucket, path, file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(
                `${this.url}/storage/v1/object/${bucket}/${path}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.anonKey}`,
                        'apikey': this.anonKey
                    },
                    body: formData
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    }

    // Get public URL for uploaded file
    getPublicUrl(bucket, path) {
        return `${this.url}/storage/v1/object/public/${bucket}/${path}`;
    }

    // Save order to database
    async saveOrder(orderData) {
        try {
            const response = await fetch(
                `${this.url}/rest/v1/orders`,
                {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify(orderData)
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error saving order:', error);
            return null;
        }
    }
}

// Initialize Supabase client
const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper functions for common operations

// Save order to Supabase
async function saveOrderToSupabase(customerInfo, cartItems, totals) {
    const orderData = {
        customer_name: customerInfo.fullname,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        customer_city: customerInfo.city,
        customer_state: customerInfo.state,
        customer_zip: customerInfo.zip,
        customer_country: customerInfo.country,
        items: JSON.stringify(cartItems),
        subtotal: totals.subtotal,
        tax: totals.tax,
        shipping: totals.shipping,
        total: totals.total,
        notes: customerInfo.notes || '',
        status: 'pending',
        created_at: new Date().toISOString()
    };

    return await supabase.saveOrder(orderData);
}

// Upload product image to Supabase
async function uploadProductImage(file, productName) {
    const timestamp = Date.now();
    const fileName = `${productName}-${timestamp}-${file.name}`;
    const path = `products/${fileName}`;

    const result = await supabase.uploadFile('products', path, file);
    
    if (result && result.path) {
        return supabase.getPublicUrl('products', result.path);
    }
    return null;
}

// Get all products from Supabase
async function getProductsFromDatabase() {
    return await supabase.getTable('products');
}

// Get all orders from Supabase
async function getOrdersFromDatabase() {
    return await supabase.getTable('orders');
}

// Resolve image URL from either full URL or Supabase storage path
function resolveProductImageUrl(imageValue, bucket = 'products') {
    if (!imageValue) return '';
    if (/^https?:\/\//i.test(imageValue)) return imageValue;
    const cleanPath = imageValue.replace(/^\/+/, '');
    return supabase.getPublicUrl(bucket, cleanPath);
}

// Log Supabase configuration (for debugging)
console.log('Supabase Configuration:');
console.log('URL:', SUPABASE_URL);
console.log('Client initialized successfully');
