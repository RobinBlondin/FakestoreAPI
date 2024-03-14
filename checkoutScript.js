import { fetchProducts } from './utilities/fetchingLogic.js'
import { createOrderConfirmation } from './utilities/createOrderConf.js'

const keyList = await fetchProducts()
const shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]')
const shoppingCartItems = new Map()
const inputInfo = new Map()

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

function writeProducts(className) {
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


        document.querySelector(className).appendChild(entry)
    })
}

writeProducts('.checkout-list');

let total = document.querySelector('.total-price')
if (shoppingCartItems.size != 0)
    total.textContent = `Total Cost: $${shoppingCartItems.keys().map(key => key.price).reduce((total, num) => total + num)}`


document.querySelector('.submit-button').addEventListener('click', e => {
    const form = document.querySelector("form")

    if (!form.checkValidity()) {
        const inputs = form.querySelectorAll("input")
        let firstInvalidInput = null;

        for (let input of inputs) {
            if (!input.checkValidity()) {
                firstInvalidInput = input;
                break;
            }
        }

        switch (firstInvalidInput.name) {
            case 'name':
                firstInvalidInput.setCustomValidity('Can only contain letters. Must be between 2-50 characters');
                break;
            case 'city':
                firstInvalidInput.setCustomValidity('Can only contain letters. Must be between 2-50 characters')
                break;
            case 'address':
                firstInvalidInput.setCustomValidity('Can only contain letters and digits. Must be between 2-50 characters')
                break;
            case 'zip':
                firstInvalidInput.setCustomValidity('Can only contain digits. Must be 5 characters.');
                break;
            case 'phone':
                firstInvalidInput.setCustomValidity('Can only contain 0-9, (), -. Must be between 0-50 characters')
                break;
            default:
                firstInvalidInput.setCustomValidity('Can only contain letters and digits. Must contain @ and be between 2-50 characters')
                break;
        }


        firstInvalidInput.reportValidity()
        firstInvalidInput.addEventListener('input', () => firstInvalidInput.setCustomValidity(''));

    } else {
        const inputs = form.querySelectorAll("input")
        for (let input of inputs) {
            inputInfo.set(input.name, input.value)
        }
        const name = `${inputInfo.get('firstName')} ${inputInfo.get('lastName')}`;
        const address1 = inputInfo.get('address');
        const address2 = inputInfo.get('zip') + " " + inputInfo.get('city');
        const phone = inputInfo.get('phone');
        const email = inputInfo.get('email');

        createOrderConfirmation(name, address1, address2, phone, email)
        writeProducts('.conf-products');

        localStorage.clear();
        form.clear();

    }
})