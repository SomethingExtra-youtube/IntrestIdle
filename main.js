var money = 0.1;
var intrest = 2;
var price = 2;

function increasemoney() {
    money += (money /= 100) * intrest;
    document.getElementById("clicks").textContent = "$" + money;
    document.getElementById("intrest").textContent = "intrest: %" + intrest;
    document.getElementById("upgradesP").textContent = "price: $" + price;
}
function buyupgrade() {
    if(money >= price) {
       intrest += 1;
       money -= price;
       price *= 5.4; 
    }
}