/**
 * CartridgePro Main JavaScript
 * Handles API calls and dynamic content population
 */

// ============================================
// Configuration
// ============================================
const API_BASE_URL = 'http://localhost:5000'; // Update to your backend URL
const SERVICES_ENDPOINT = '/api/services';
const PRODUCTS_ENDPOINT = '/api/products';

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('[v0] CartridgePro app initialized');
    loadServices();
    loadProducts();
    setupContactForm();
});

// ============================================
// Fetch Services from API
// ============================================
async function loadServices() {
    const servicesList = document.getElementById('services-list');
    
    try {
        console.log('[v0] Fetching services from API...');
        const response = await fetch(`${API_BASE_URL}${SERVICES_ENDPOINT}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const services = await response.json();
        console.log('[v0] Services received:', services);
        
        // Clear loading message
        servicesList.innerHTML = '';
        
        // Check if services array is empty
        if (!services || services.length === 0) {
            servicesList.innerHTML = '<p class="loading">No services available at the moment.</p>';
            return;
        }
        
        // Populate services
        services.forEach((service) => {
            const serviceCard = createServiceCard(service);
            servicesList.appendChild(serviceCard);
        });
        
    } catch (error) {
        console.error('[v0] Error loading services:', error);
        servicesList.innerHTML = `
            <p class="loading" style="color: #d32f2f;">
                Error loading services. Please check your backend connection.
            </p>
        `;
    }
}

// ============================================
// Fetch Products from API
// ============================================
/*async function loadProducts() {
    const productsList = document.getElementById('products-list');
    
    try {
        console.log('[v0] Fetching products from API...');
        const response = await fetch(`${API_BASE_URL}${PRODUCTS_ENDPOINT}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        console.log('[v0] Products received:', products);
        
        // Clear loading message
        productsList.innerHTML = '';
        
        // Check if products array is empty
        if (!products || products.length === 0) {
            productsList.innerHTML = '<p class="loading">No products available at the moment.</p>';
            return;
        }
        
        // Populate products
        products.forEach((product) => {
            const productCard = createProductCard(product);
            productsList.appendChild(productCard);
        });
        
    } catch (error) {
        console.error('[v0] Error loading products:', error);
        productsList.innerHTML = `
            <p class="loading" style="color: #d32f2f;">
                Error loading products. Please check your backend connection.
            </p>
        `;
    }
}*/

// ============================================
// Create Service Card DOM Element
// ============================================
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
        <h3>${escapeHtml(service.name || 'Service')}</h3>
        <p>${escapeHtml(service.description || 'No description available')}</p>
    `;
    return card;
}

// ============================================
// Create Product Card DOM Element
// ============================================
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const price = product.price 
        ? `$${parseFloat(product.price).toFixed(2)}` 
        : 'Contact for pricing';
    
    card.innerHTML = `
        <h3>${escapeHtml(product.name || 'Product')}</h3>
        <p>${escapeHtml(product.description || 'No description available')}</p>
        <div class="price">${escapeHtml(price)}</div>
        <button class="btn">Add to Cart</button>
    `;
    
    return card;
}

// ============================================
// Setup Contact Form Handler
// ============================================
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('[v0] Contact form submitted');
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Log form data (in production, you'd send this to your backend)
            console.log('[v0] Form data:', { name, email, message });
            
            // Show confirmation message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// ============================================
// Utility: Escape HTML to prevent XSS
// ============================================
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}