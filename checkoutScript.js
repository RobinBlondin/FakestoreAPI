import { fetchProducts } from './utilities/fetchingLogic.js'

const keyList = await fetchProducts()

const shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]')
console.log(shoppingCart.length)
const shoppingCartItems = new Map()


keyList.forEach(key => {
    shoppingCart.forEach(cartId => {
        if (key.id.toString() === cartId) {
            if (shoppingCartItems.get(key) != null) {
                shoppingCartItems.set(key, shoppingCartItems.get(key) + 1)
            } else {
                shoppingCartItems.set(key, 1)
            }
        }
    })
})

console.log(shoppingCartItems.size)


shoppingCartItems.forEach((value, key) => {
    console.log(typeof value)
    const entry = document.createElement('div')
    entry.className = 'row mt-3'
    entry.innerHTML = `<div class="col-4 checkout-title">
                            ${key.title}
                        </div>
                        <div class="col-2">
                            ${value}
                        </div>
                        <div class="col-3 ">
                            $${key.price}
                        </div>
                        <div class="col-3">
                            $${key.price * value}
                        </div>`;

    
    document.querySelector('.checkout-list').appendChild(entry)
})

let total = document.querySelector('.total-price')
total.textContent = `Total Cost: $${shoppingCartItems.keys().map(key => key.price).reduce((total, num) => total + num)}`