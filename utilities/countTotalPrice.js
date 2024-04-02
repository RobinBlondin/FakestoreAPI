export function countTotalPrice(shoppingCart, productList) {
    if (shoppingCart.length > 0)
        return shoppingCart.map(id => 
            productList.find(product => product.id == parseInt(id)).price)
            .reduce((total, num) => Number(total) + Number(num))
            .toFixed(2)
    else 
        return 0;
}
