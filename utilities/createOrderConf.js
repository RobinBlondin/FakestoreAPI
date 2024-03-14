export function createOrderConfirmation(name, address1, address2, phone, email) {
    fetch('./components/confirmation.html')
    .then(res => res.text())
    .then(data => {
        const temp = document.createElement('div')
        temp.innerHTML = data;
        const date = new Date();
        const shortDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        temp.querySelector('.span-conf-email').textContent = email;
        temp.querySelector('.conf-date').textContent = shortDate;
        temp.querySelector('.conf-order-no').textContent = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
        temp.querySelector('.conf-name').textContent = name;
        temp.querySelector('.conf-address1').textContent = address1;
        temp.querySelector('.conf-address2').textContent = address2;
        temp.querySelector('.conf-phone').textContent = phone;
        temp.querySelector('.conf-email').textContent = email;

        document.querySelector('.conf-content').appendChild(temp);
        const order = document.getElementById('order-confi').style.display = 'block';
    })
}