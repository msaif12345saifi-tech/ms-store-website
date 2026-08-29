// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart Function
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' added to cart!');
    updateCartCount();
}

// Display Cart Items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">Your cart is empty. <a href="products.html">Continue Shopping</a></td></tr>';
        updateCartTotals();
        return;
    }
    
    cart.forEach((item, index) => {
        const total = (item.price * item.quantity).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" style="width: 50px;">
            </td>
            <td>$${total}</td>
            <td><button class="btn btn-secondary" style="padding: 0.5rem 1rem;" onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });
    
    updateCartTotals();
}

// Update Quantity
function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Update Cart Totals
function updateCartTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = tax.toFixed(2);
    if (totalEl) totalEl.textContent = total.toFixed(2);
}

// Update Cart Count in Navigation
function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    // This can be added to navbar if needed
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout. Thank you for your purchase!');
    // Clear cart after checkout
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Contact Form Submission
function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    alert('Thank you ' + name + '! Your message has been sent. We will contact you at ' + email + ' soon.');
    
    // Reset form
    event.target.reset();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});