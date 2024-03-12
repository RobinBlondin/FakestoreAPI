export function createCartEntry(id, imageSrc, title, price, productAmount) {
    fetch('../components/cart_entry.html')
        .then(res => res.text())
        .then(data => {
            const temp = document.createElement('div')
            temp.innerHTML = data

            const cart = temp.firstElementChild;

            cart.querySelector('.cart-image').src = imageSrc
            cart.querySelector('.cart-title').textContent = title
            cart.querySelector('.cart-price').textContent = `$${price}`
            cart.querySelector('.cart-input').value = productAmount.toString()
            cart.querySelector('.minus').setAttribute('minus-id', id)
            cart.querySelector('.plus').setAttribute('plus-id', id);
            cart.querySelector('.cart-input').setAttribute('input-id', id);
            cart.style.animationDelay = `${1 * 100}ms`;
            
            

            document.querySelector('.cart-panel').appendChild(cart)
        })
}