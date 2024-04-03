import { setCartCount } from './utilities/cartCounterLogic.js'
import { fetchProducts } from './utilities/fetchingLogic.js'
import { createCartEntry } from './utilities/createCartEntry.js'
import { countTotalPrice } from './utilities/countTotalPrice.js'

const productList = await fetchProducts()
const shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]')
let totalElement = document.querySelector('.cart-total-price')

loadTotalPrice();
setCartCount(shoppingCart.length)
loadCartEntries()

document.addEventListener('click', function (e) {
    const target = e.target.className;
    const id = e.target.getAttribute('clicked-id');
    const cartPanel = document.querySelector('.cart-panel');
    cartPanel.innerHTML = '';    

    switch (target) {
        case 'minus':
            shoppingCart.splice(shoppingCart.indexOf(id), 1);
            break;
        case 'plus':
            shoppingCart.push(id);
            break;
        case 'trash-icon':
            localStorage.clear();
            shoppingCart.splice(0, shoppingCart.length)
            break;
        case 'x-icon':
            const amount = shoppingCart.filter(productId => productId === id).length;
            shoppingCart.sort().splice(shoppingCart.indexOf(id), amount)

    }    

    loadTotalPrice();
    loadCartEntries()
    setCartCount(shoppingCart.length)
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
})

function loadCartEntries() {
    productList.forEach(product => {
        const productId = product.id.toString()
        if(shoppingCart.includes(productId)) {
            const amount = shoppingCart.filter(num => num === productId).length
            createCartEntry(product.id, product.image, product.title, product.price, amount)
        }
    })
}

function loadTotalPrice() {
    if(shoppingCart.length > 0)
        totalElement.textContent = `Total price: $${countTotalPrice(shoppingCart, productList)}`
    else 
        totalElement.textContent = ''
}