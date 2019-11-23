var money = 1;
var intrest = 2;
var price = 1.05;
var price2 = 1.05;
var delay = 10;
var delaymax = 10;
var speedy = 1000;

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
        speedy /= 1.5;
        money -= price2;
        price2 *= 5.4; 
     }
}
function updateUI() {
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
        delay -= 1;
        if(delay <= 0) {
            increasemoney();
            delay = delaymax;
        }
    }
    setInterval(timer, speedy);
}
window.onload = update;
