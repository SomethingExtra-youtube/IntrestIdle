var money = 1;
var intrest = 2;
var price = 1.05;
var price2 = 1.05;
var delay = 100;
var delaymax = 100;
var minus = 1;
var moneyplus = 0.01;
var jobpoints = 1;
var jobmax = 50;
var jobprice = 50;
var jobplus = 1;

function increasemoney() {
    updateUI();
    money += (money /= 100) * intrest;
}
function buyupgrade() {
    if(money >= price) {
        updateUI();
       intrest += 1;
       money -= price;
       price *= 1.5; 
    }
}
function buyupgrade2() {
    if(money >= price2) {
        updateUI();
        minus += 1;
        money -= price2;
        price2 *= 5.4; 
     }
}
function buyupgrade3() {
    if(jobpoints >= jobprice) {
        updateUI();
        jobplus += 1;
        jobpoints -= jobprice;
        jobprice *= 4;
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
    document.getElementById("skill").textContent = "skill points: " + jobpoints + "/" + jobmax + " till promotion";
    document.getElementById("jobpri").textContent = "price: " + jobprice + " skill points";
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
        if(jobpoints >= jobmax) {
            moneyplus *= 1.7;
            jobmax *= 3;
            jobpoints = 0;
        }
    }
    setInterval(timer, 1000);
}
function job() {
    jobpoints += jobplus;
    money += moneyplus;
    updateUI();
}
window.onload = update;
function round_to_precision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}