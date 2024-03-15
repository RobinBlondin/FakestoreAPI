import { processProducts, filterProductByCategory, filterProductBySearch, fetchProducts, fillCategoryMenu } from './utilities/fetchingLogic.js'
import { setCartCount, incrementCartCount, decrementCartCount } from './utilities/cartCounterLogic.js';

const list = await fetchProducts();
processProducts(list);
fillCategoryMenu()

const shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]')
console.log(shoppingCart.length)
setCartCount(shoppingCart.length)

document.getElementById('search').addEventListener("search", () => {
    const productPanel = document.getElementById('products')
    productPanel.innerHTML = '';

    const searchField = document.getElementById('search')
    const value = searchField.value

    filterProductBySearch(value)

})

document.addEventListener('click', e => {
    if (e.target && (e.target.matches('button.add-to-cart-button') || e.target.matches('button.mi-addtocart'))) {
        const productId = e.target.getAttribute('button-id')
        incrementCartCount()
        console.log(`id: ${productId}`)

        shoppingCart.push(productId)
        localStorage.setItem('cart', JSON.stringify(shoppingCart));

    } else if (e.target && e.target.matches('button.more-info-button')) {
        const productId = e.target.getAttribute('button-id');
        const product = list.find(product => product.id === parseInt(productId))
        document.querySelector('.mi-addtocart').setAttribute('button-id', productId)

        document.querySelector('.more-info-image').src = product.image
        document.querySelector('.more-info-title').textContent = product.title
        document.querySelector('.more-info-desc').textContent = product.description
        document.querySelector('.more-info-price').textContent = `$${product.price}`
        document.querySelector('.more-info-card').style.display = 'block'
    } else if (e.target && e.target.matches('button.mi-close')) {
        document.querySelector('.more-info-card').style.display = 'none'
    }
})





