export function createCard(id, imageSrc, title, price) {
    fetch('../components/card.html')
        .then(res => res.text())
        .then(data => {
            const temp = document.createElement('div')
            temp.innerHTML = data

            const card = temp.firstElementChild;

            card.querySelector('.add-to-cart-button').setAttribute('button-id', id)
            card.querySelector('.more-info-button').setAttribute('button-id', id)
            card.querySelector('.product-image').src = imageSrc
            card.querySelector('.product-title').textContent = title
            card.querySelector('.product-price').textContent = `$${price}`
            /* card.style.animationDelay = `${1 * 100}ms`; */
            
            

            document.querySelector('.product-list').appendChild(card)
        })
        .catch(error => console.error('Error in card' + error))
}