export function setCartCount(input) {
    const cart = document.getElementById('cart-counts');
    if (input > 0) {
        cart.textContent = input;
        cart.style.display = 'block';
    } else if (input == 0) {
        cart.style.display = 'none'
    }

}

export function incrementCartCount() {
    const cart = document.getElementById('cart-counts');
    cart.textContent = parseInt(cart.textContent) + 1;
    cart.style.display = 'block'
}

export function decrementCartCount() {
    const cart = document.getElementById('cart-counts');
    if (parseInt(cart.textContent) > 0) {
        cart.textContent = parseInt(cart.textContent - 1);
    }
}

