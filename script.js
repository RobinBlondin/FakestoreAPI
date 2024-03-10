import { processProducts, filterProductByCategory, filterProductBySearch, fetchProducts } from './fetchingLogic.js'

const list = await fetchProducts();

processProducts(list);

document.getElementById('search').addEventListener("search", function() {
    const productPanel = document.getElementById('products')
    productPanel.innerHTML = '';

    const searchField = document.getElementById('search')
    const value = searchField.value

    filterProductBySearch(value)

})