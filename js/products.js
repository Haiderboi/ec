// Product Database and Functions
// Contains all products for Fashion and Electronics categories

const products = {
    fashion: [
        {
            id: 'f1',
            name: 'Classic Blue Jacket',
            price: 79.99,
            category: 'Jackets',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop',
            description: 'Timeless classic blue jacket perfect for any occasion',
            rating: 4.5,
            reviews: 128
        },
        {
            id: 'f2',
            name: 'Black Elegant Dress',
            price: 89.99,
            category: 'Dresses',
            image: 'https://images.unsplash.com/photo-1595777712802-8cda72f3a42c?w=400&h=400&fit=crop',
            description: 'Sophisticated black dress for formal events',
            rating: 4.7,
            reviews: 95
        },
        {
            id: 'f3',
            name: 'White Premium Sneakers',
            price: 59.99,
            category: 'Shoes',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            description: 'Comfortable and stylish white sneakers',
            rating: 4.6,
            reviews: 210
        },
        {
            id: 'f4',
            name: 'Gold Statement Necklace',
            price: 39.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
            description: 'Beautiful gold necklace to complete your look',
            rating: 4.4,
            reviews: 67
        },
        {
            id: 'f5',
            name: 'Red Summer Dress',
            price: 69.99,
            category: 'Dresses',
            image: 'https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400&h=400&fit=crop',
            description: 'Vibrant red dress perfect for summer outings',
            rating: 4.3,
            reviews: 84
        },
        {
            id: 'f6',
            name: 'Leather Ankle Boots',
            price: 99.99,
            category: 'Shoes',
            image: 'https://images.unsplash.com/photo-1595525874261-91bc1d58f184?w=400&h=400&fit=crop',
            description: 'Premium leather boots for comfort and style',
            rating: 4.8,
            reviews: 156
        },
        {
            id: 'f7',
            name: 'UV Protection Sunglasses',
            price: 44.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
            description: 'Stylish sunglasses with complete UV protection',
            rating: 4.5,
            reviews: 102
        },
        {
            id: 'f8',
            name: 'Cozy Wool Sweater',
            price: 64.99,
            category: 'Jackets',
            image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
            description: 'Warm and comfortable wool sweater for winter',
            rating: 4.6,
            reviews: 139
        }
    ],
    electronics: [
        {
            id: 'e1',
            name: 'Pro Laptop 15"',
            price: 1299.99,
            category: 'Laptops',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
            description: 'High-performance laptop for professionals',
            rating: 4.7,
            reviews: 342
        },
        {
            id: 'e2',
            name: 'Smartphone X Pro',
            price: 999.99,
            category: 'Phones',
            image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
            description: 'Latest smartphone with advanced features',
            rating: 4.8,
            reviews: 521
        },
        {
            id: 'e3',
            name: 'Wireless Headphones Pro',
            price: 299.99,
            category: 'Headphones',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            description: 'Premium wireless headphones with noise cancellation',
            rating: 4.6,
            reviews: 287
        },
        {
            id: 'e4',
            name: 'Tablet Pro 12.9"',
            price: 749.99,
            category: 'Tablets',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
            description: 'Large screen tablet for work and entertainment',
            rating: 4.5,
            reviews: 198
        },
        {
            id: 'e5',
            name: 'Gaming Laptop RTX',
            price: 1599.99,
            category: 'Laptops',
            image: 'https://images.unsplash.com/photo-1588872657840-e74d440642ca?w=400&h=400&fit=crop',
            description: 'Powerful gaming laptop with RTX graphics',
            rating: 4.9,
            reviews: 456
        },
        {
            id: 'e6',
            name: 'Standard Smartphone',
            price: 599.99,
            category: 'Phones',
            image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
            description: 'Reliable smartphone for everyday use',
            rating: 4.4,
            reviews: 312
        },
        {
            id: 'e7',
            name: 'Bluetooth Earbuds Pro',
            price: 149.99,
            category: 'Headphones',
            image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
            description: 'Compact Bluetooth earbuds with great sound',
            rating: 4.3,
            reviews: 421
        },
        {
            id: 'e8',
            name: 'Tablet Standard 10"',
            price: 449.99,
            category: 'Tablets',
            image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
            description: 'Affordable tablet for daily tasks',
            rating: 4.2,
            reviews: 165
        }
    ]
};

// Get all products
function getAllProducts() {
    return [...products.fashion, ...products.electronics];
}

// Get products by category
function getProductsByCategory(category) {
    return getAllProducts().filter(p => p.category === category);
}

// Get products by type (fashion or electronics)
function getProductsByType(type) {
    return products[type] || [];
}

// Search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return getAllProducts().filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
}

// Filter products by price range
function filterByPrice(minPrice, maxPrice) {
    return getAllProducts().filter(p => p.price >= minPrice && p.price <= maxPrice);
}

// Get unique categories
function getCategories(type) {
    const typeProducts = type ? products[type] : getAllProducts();
    const categories = new Set(typeProducts.map(p => p.category));
    return Array.from(categories).sort();
}

// Sort products
function sortProducts(productList, sortBy = 'name') {
    const sorted = [...productList];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'reviews':
            return sorted.sort((a, b) => b.reviews - a.reviews);
        case 'name':
        default:
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
}

// Get single product by ID
function getProductById(id) {
    return getAllProducts().find(p => p.id === id);
}

// Get price range for a product type
function getPriceRange(type) {
    const typeProducts = type ? products[type] : getAllProducts();
    if (typeProducts.length === 0) return { min: 0, max: 0 };
    
    const prices = typeProducts.map(p => p.price);
    return {
        min: Math.min(...prices),
        max: Math.max(...prices)
    };
}

// Render product card HTML
function renderProductCard(product) {
    const stars = '⭐'.repeat(Math.floor(product.rating));
    const productImage = typeof resolveProductImageUrl === 'function'
        ? resolveProductImageUrl(product.image)
        : product.image;
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${productImage}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}'">
                <span class="product-category">${product.category}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-value">${product.rating}</span>
                    <span class="reviews">(${product.reviews} reviews)</span>
                </div>
                <div class="product-footer">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="btn-add-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Log available products on page load
console.log('Products loaded: ', getAllProducts().length, 'total products');
console.log('Fashion items: ', products.fashion.length);
console.log('Electronics items: ', products.electronics.length);
