import { processProducts, filterProductByCategory, filterProductBySearch, fetchProducts, fillCategoryMenu } from './utilities/fetchingLogic.js'
import { setCartCount, incrementCartCount, decrementCartCount } from './utilities/cartCounterLogic.js';

const list = await fetchProducts();
processProducts(list);
fillCategoryMenu()

const shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]')
console.log(shoppingCart.length)
setCartCount(shoppingCart.length)

document.getElementById('search').addEventListener("search", function () {
    const productPanel = document.getElementById('products')
    productPanel.innerHTML = '';

    const searchField = document.getElementById('search')
    const value = searchField.value

    filterProductBySearch(value)

})

document.addEventListener('click', function (e) {
    if (e.target && e.target.matches('button.add-to-cart-button')) {
        const productId = e.target.getAttribute('button-id')
        incrementCartCount()

        shoppingCart.push(productId)
        localStorage.setItem('cart', JSON.stringify(shoppingCart));

    } else if (e.target && e.target.matches('img.cartButton')) {
        console.log('hello')
    }
})





