import { processProducts, filterProductByCategory, filterProductBySearch, fetchProducts } from './fetchingLogic.js'

const shoppingCart = new Map();
const list = await fetchProducts();

processProducts(list);

document.getElementById('search').addEventListener("search", function() {
    const productPanel = document.getElementById('products')
    productPanel.innerHTML = '';

    const searchField = document.getElementById('search')
    const value = searchField.value

    filterProductBySearch(value)

})

document.addEventListener('click', function(e) {
    if (e.target && e.target.matches('button.add-to-cart-button')) {
        console.log('hello')
        const productId = e.target.getAttribute('button-id')
        console.log(productId)
        var cart = document.getElementById('cart-counts')
        
        cart.textContent = parseInt(cart.textContent) + 1

        list.forEach(product => {
            if(product.id == productId) {
            if (shoppingCart.get(product) == null) {
                shoppingCart.set(product, 1)
            } else {
                shoppingCart.set(product, shoppingCart.get(product) + 1)
            }
        }
        })
        cart.style.display = 'block'
    } else if (e.target && e.target.matches('span.minus')) {

    } else if (e.target && e.target.matches('span.plus')) {
        
    }
})



