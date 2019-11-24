var money = 1;
var intrest = 2;
var price = 1.05;
var price2 = 1.05;
var delay = 10;
var delaymax = 10;
var minus = 1;

function increasemoney() {
    money += (money /= 100) * intrest;
}
function buyupgrade() {
    if(money >= price) {
       intrest += 1;
       money -= price;
       price *= 1.5; 
    }
}
function buyupgrade2() {
    if(money >= price2) {
        minus += 1;
        money -= price2;
        price2 *= 5.4; 
     }
}
function updateUI() {
    money = round_to_precision(money, 0.01);
    price = round_to_precision(price, 0.01);
    price2 = round_to_precision(price2, 0.01);
    document.getElementById("delay").textContent = "intrest pay: " + delay;
    document.getElementById("clicks").textContent = "$" + money;
    document.getElementById("intrest").textContent = "intrest: %" + intrest;
    document.getElementById("upgradesP").textContent = "price: $" + price;
    document.getElementById("upgradesP2").textContent = "price: $" + price2;
}
function update() {
    function timer() {
        if (money < 1) {
            money = 1;
        }
        updateUI();
        delay -= minus;
        if(delay <= 0) {
            increasemoney();
            delay = delaymax;
        }
    }
    setInterval(timer, 1000);
}
window.onload = update;
function round_to_precision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}