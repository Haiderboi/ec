# EC Shop - E-Commerce Website

A complete, fully-functional e-commerce website built with HTML, CSS, and JavaScript. Features fashion and electronics products, shopping cart management, and WhatsApp Commerce integration.

## 🎯 Features

### ✨ Core Features
- **Product Catalog**: Browse 16+ products across Fashion and Electronics categories
- **Shopping Cart**: Add/remove items, manage quantities, persistent storage using localStorage
- **Product Filtering**: Filter by category, price range, and search terms
- **Sorting Options**: Sort by price, name, rating, and more
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **WhatsApp Checkout**: Complete orders directly through WhatsApp Commerce
- **Order Management**: View order summaries with automatic calculations

### 📱 Pages
1. **Home (index.html)** - Landing page with featured products and categories
2. **Fashion (fashion.html)** - Fashion products with advanced filtering
3. **Electronics (electronics.html)** - Electronics products with search capabilities
4. **Cart (cart.html)** - Shopping cart with item management
5. **Checkout (checkout.html)** - Order summary and WhatsApp checkout

### 🛠️ Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Responsive styling with flexbox and grid
- **JavaScript (Vanilla)** - No frameworks required
- **Supabase** - Backend for image storage and data management
- **LocalStorage** - Cart persistence
- **WhatsApp API** - Commerce integration

## 📦 Product Categories

### Fashion (8 items)
- Classic Blue Jacket
- Black Elegant Dress
- White Premium Sneakers
- Gold Statement Necklace
- Red Summer Dress
- Leather Ankle Boots
- UV Protection Sunglasses
- Cozy Wool Sweater

### Electronics (8 items)
- Pro Laptop 15"
- Smartphone X Pro
- Wireless Headphones Pro
- Tablet Pro 12.9"
- Gaming Laptop RTX
- Standard Smartphone
- Bluetooth Earbuds Pro
- Tablet Standard 10"

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or build process required

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Haiderboi/ec.git
cd ec
```

2. **Open in browser**
```bash
# Simply open index.html in your web browser
open index.html
# or right-click and select "Open with" your browser
```

## 📖 How to Use

### Browsing Products
1. Visit the Home page
2. Click on "Fashion" or "Electronics" to view products
3. Use filters to narrow down your search:
   - Search by product name
   - Filter by category
   - Filter by price range
   - Sort by various criteria

### Shopping
1. Click "Add to Cart" on any product
2. View your cart by clicking the cart icon in the header
3. Adjust quantities or remove items as needed
4. The cart automatically persists in your browser

### Checkout
1. Click "Proceed to Checkout" from cart page
2. Fill in shipping information:
   - Full name, email, phone
   - Shipping address
   - Optional special instructions
3. Review your order summary
4. Click "Complete Order via WhatsApp"
5. WhatsApp will open with pre-filled order details
6. Complete payment through WhatsApp Commerce

## 🔧 Configuration

### Supabase Setup (Optional)
The app is pre-configured with Supabase credentials in `js/supabase.js`:

```javascript
const SUPABASE_URL = 'https://yyvciloshdtkdtiidepn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xAMAJYfDOOxCalTWCjO1Pw_pC6iR-ws';
```

To use Supabase for storing orders and images:
1. Create tables in Supabase (orders, products, images)
2. Update the table names in `js/supabase.js`
3. Configure storage buckets for images

## 📁 Project Structure

```
ec/
├── index.html              # Home page
├── fashion.html            # Fashion products page
├── electronics.html        # Electronics products page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout page with WhatsApp integration
├── css/
│   └── style.css          # Main stylesheet (2000+ lines)
├── js/
│   ├── products.js        # Product database and functions
│   ├── cart.js            # Shopping cart logic
│   └── supabase.js        # Supabase backend integration
├── .env.example           # Environment variables template
└── README.md              # Documentation (this file)
```

## 💾 Cart Management

The shopping cart uses browser localStorage for persistence:
- Cart data survives page refresh
- Cart syncs across browser tabs
- Automatic calculation of subtotal, tax, and shipping
- Tax rate: 10%
- Shipping cost: $5.00 (flat rate)

## 🛒 Product Database

Products are stored in `js/products.js` with the following properties:
- `id` - Unique product identifier
- `name` - Product name
- `price` - Product price
- `category` - Product category
- `image` - Product image URL
- `description` - Product description
- `rating` - Star rating (1-5)
- `reviews` - Number of customer reviews

## 📱 WhatsApp Checkout

The checkout process generates a pre-formatted message that includes:
- Customer information
- Itemized order details
- Order totals with breakdown
- Shipping address
- Special instructions

The message is automatically sent to WhatsApp where customers can complete payment.

## 🎨 Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #6366f1;      /* Main color */
    --secondary-color: #8b5cf6;    /* Secondary color */
    --success-color: #10b981;      /* Success/Add to cart */
    --danger-color: #ef4444;       /* Remove/Delete */
}
```

### Adding Products
Edit `js/products.js` to add new products:
```javascript
{
    id: 'f9',
    name: 'Your Product Name',
    price: 99.99,
    category: 'Your Category',
    image: 'https://image-url.com',
    description: 'Product description',
    rating: 4.5,
    reviews: 50
}
```

### Adjusting Tax & Shipping
Edit `js/cart.js`:
```javascript
this.TAX_RATE = 0.10;      // Change tax rate
this.SHIPPING_COST = 5.00; // Change shipping cost
```

## 🚨 Troubleshooting

### Cart not persisting
- Check if localStorage is enabled in your browser
- Clear browser cache and reload

### Images not loading
- Check image URLs are accessible
- Use URLs from Unsplash, Pexels, or similar CDNs

### WhatsApp not opening
- Ensure WhatsApp is installed
- Check browser WhatsApp API support
- Use a desktop/mobile device with WhatsApp

## 🔒 Security Notes

- This is a frontend-only application for demonstration
- Never expose sensitive API keys in production
- Use environment variables for sensitive data
- Implement proper backend validation for orders

## 📊 Performance

- Optimized images with lazy loading
- Minimal dependencies (vanilla JavaScript)
- Fast page load times
- Smooth animations and transitions

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📞 Support

For issues or questions:
- Email: info@ecshop.com
- Create an issue on GitHub

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Features Roadmap

Future enhancements:
- [ ] User authentication and profiles
- [ ] Order history tracking
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email order confirmations
- [ ] Product reviews and ratings system
- [ ] Wishlists/Favorites
- [ ] Advanced inventory management
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Real-time notifications

## 🙏 Credits

- Product images: Unsplash
- Icons: Unicode Emojis
- Backend: Supabase
- Payment: WhatsApp Commerce

---

**Happy Shopping! 🛍️**

Built with ❤️ by Haider Ali Shabbir
