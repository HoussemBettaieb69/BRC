//config 
const API_BASE_URL = 'https://brc-jrl3.onrender.com'; // bch yetbadel
const SERVICES_ENDPOINT = '/api/services';
const CONTACT_ENDPOINT = '/api/contact';

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('c bon 5dem');
    loadServices();
    setupContactForm();
});

// ============================================
// Fetch Services from API
// ============================================
async function loadServices() {
    const servicesList = document.getElementById('services-list');
    
    try {
        console.log('hwa jay el trinooo');
        const response = await fetch(`${API_BASE_URL}${SERVICES_ENDPOINT}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const services = await response.json();
        console.log('ala ja bel car:', services);
        
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
        console.error('error:', error);
        servicesList.innerHTML = `
            <p class="loading" style="color: #d32f2f;">
                Error loading services. Please check your backend connection.
            </p>
        `;
    }
}


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
// Setup Contact Form Handler
// ============================================
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('arja3 8odwa');
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Log form data (in production, you'd send this to your backend)
            console.log('Form data:', { name, email, message });
            // eli yab3eth ll express 
            fetch('https://brc-jrl3.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
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