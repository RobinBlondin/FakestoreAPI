import { processProducts, filterProductBySearch, fetchProducts, fillCategoryMenu } from './utilities/fetchingLogic.js'
import { setCartCount, incrementCartCount } from './utilities/cartCounterLogic.js';

const list = await fetchProducts();
const shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]')

processProducts(list);
fillCategoryMenu()
setCartCount(shoppingCart.length)

document.getElementById('search').addEventListener("search", () => {
    const productPanel = document.getElementById('products')
    productPanel.innerHTML = '';

    const searchField = document.getElementById('search')
    const value = searchField.value

    filterProductBySearch(value)

})

document.addEventListener('click', e => {
    const target = e.target.className;
    const productId = e.target.getAttribute('button-id')

    switch(target) {
        case 'add-to-cart-button':
        case 'mi-addtocart':
            incrementCartCount()
            shoppingCart.push(productId)
            localStorage.setItem('cart', JSON.stringify(shoppingCart));
            break;
        case 'more-info-button':
            const product = list.find(product => product.id === parseInt(productId));
            
            document.querySelector('.mi-addtocart').setAttribute('button-id', productId);
            document.querySelector('.more-info-image').src = product.image;
            document.querySelector('.more-info-title').textContent = product.title;
            document.querySelector('.more-info-desc').textContent = product.description;
            document.querySelector('.more-info-price').textContent = `$${product.price}`;
            document.querySelector('.more-info-card').style.display = 'block';
            break;
        case 'mi-close':
            document.querySelector('.more-info-card').style.display = 'none';
            break;
    }
})





