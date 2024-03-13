import { createCard } from "./createCard.js"

export async function fetchProducts() {
    try{
        const response = await fetch('https://fakestoreapi.com/products/');
        const data = await response.json()

        return data
    } catch (error) {
        console.error("Problems with:" + error)
    }
}

export async function processProducts() {
    const inputList = await fetchProducts()

    inputList.forEach(product => {
        createCard(product.id, product.image, product.title, product.price)
        console.log(product.id)
    })
}

export async function filterProductByCategory(category) {
    const productsList = await fetchProducts();

    productsList.forEach(product => {
        if (product.category.includes(category)) {
            createCard(product.id, product.image, product.title, product.price)
        }
    })
}

export async function filterProductBySearch(word) {
    const productsList = await fetchProducts();

    productsList.forEach(product => {
        if (product.category.includes(word) || product.title.includes(word) || product.description.includes(word)) {
            createCard(product.id, product.image, product.title, product.price)
        }
    })
}

export async function fillCategoryMenu() {
    const productsList = await fetchProducts();

    const categories = new Set(productsList.map(function(product) {
        return product.category;
    }))
    
   categories.forEach(category => {
    const temp = document.createElement('button');
    temp.className = "list-item"

    temp.addEventListener('click', function() {
        const productPanel = document.getElementById('products')
        productPanel.innerHTML = '';

        filterProductByCategory(category)
    })

    temp.textContent = category;
    document.querySelector('.dropdown-content').appendChild(temp)
   })
}
 

