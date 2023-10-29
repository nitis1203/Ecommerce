// Initialize an empty shopping cart
const shoppingCart = [];

// Get all the "Add to Cart" buttons on the page
const addToCartButtons = document.querySelectorAll('button');

// Add event listeners to each "Add to Cart" button
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Get the product information from the current product section
        const productSection = button.parentElement;
        const productName = productSection.querySelector('h2').textContent;
        const productPrice = parseFloat(productSection.querySelector('.price').textContent.replace('$', ''));

        // Create a new item object
        const newItem = {
            name: productName,
            price: productPrice,
        };

        // Add the item to the shopping cart
        shoppingCart.push(newItem);

        // Update the cart display
        updateCartDisplay();
    });
});

// Function to update the cart display
function updateCartDisplay() {
    const cartDisplay = document.querySelector('#cart-display');
    cartDisplay.innerHTML = ''; // Clear the cart display

    shoppingCart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartDisplay.appendChild(cartItem);
    });
}
