import { incrementCartCount, decrementCartCount, setCartCount } from './utilities/cartCounterLogic.js'
import { processProducts, filterProductByCategory, filterProductBySearch, fetchProducts } from './utilities/fetchingLogic.js'
import { createCartEntry } from './utilities/createCartEntry.js'


const productList = await fetchProducts()
const shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]')

setCartCount(shoppingCart.length)
loadCartEntries()


document.addEventListener('click', function (e) {

    if (e.target && e.target.matches('span.minus')) {
        const id = e.target.getAttribute('minus-id')
        const cartPanel = document.querySelector('.cart-panel')

        shoppingCart.splice(shoppingCart.indexOf(id), 1)
        cartPanel.innerHTML = '';

        loadCartEntries();
        setCartCount(shoppingCart.length)

        localStorage.setItem('cart', JSON.stringify(shoppingCart))
       
    } else if (e.target && e.target.matches('span.plus')) {
        const id = e.target.getAttribute('plus-id')
        const cartPanel = document.querySelector('.cart-panel')
       
        shoppingCart.push(id)
        cartPanel.innerHTML = '';

        loadCartEntries();
        setCartCount(shoppingCart.length)

        localStorage.setItem('cart', JSON.stringify(shoppingCart))
    }
})

document.getElementById('clear').addEventListener('click', function () {
    localStorage.clear()
    shoppingCart.splice(0, shoppingCart.length)
    loadCartEntries()
    setCartCount(shoppingCart.length)
});

function loadCartEntries() {
    productList.forEach(product => {
        const productId = product.id.toString()
        if(shoppingCart.includes(productId)) {
            const amount = shoppingCart.filter(num => num === productId).reduce((total, num) => total + num).length
            createCartEntry(product.id, product.image, product.title, product.price, amount)
        }
    })
}