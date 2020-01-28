var money = 1;
var intrest = 2;
var price = 1.05;
var price2 = 1.05;
var price3 = 3;
var delay = 0;
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
       price *= 5.4; 
    }
}
function buyupgrade2() {
    if(money >= price2) {
        updateUI();
        minus += 1;
        money -= price2;
        price2 *= 1.7; 
     }
}
function buyupgrade3() {
    if(jobpoints >= jobprice && money >= price3) {
        updateUI();
        money -= price3
        jobplus += 1;
        jobpoints -= jobprice;
        jobprice *= 4;
        price3 *= 3;
     }
}
function updateUI() {
    document.getElementById("delay").textContent = "interest pay: " + delay.toFixed(2) + "/" + delaymax;
    document.getElementById("clicks").textContent = "$"+ money.toFixed(2);
    document.getElementById("intrest").textContent = "interest: %" + intrest.toFixed(2);
    document.getElementById("upgradesP").textContent = "price: $" + price.toFixed(2);
    document.getElementById("upgradesP2").textContent = "price: $" + price2.toFixed(2);
    document.getElementById("skill").textContent = "skill points: " + jobpoints + "/" + jobmax + " till promotion!!";
    document.getElementById("jobpri").textContent = "price: " + jobprice + " skill points and $" + price3;
    document.getElementById("jobbutton").textContent = "do your job for $" + moneyplus.toFixed(2);
    document.getElementById("skillperclick").textContent = "skill points per click: " + jobplus;
    price3.toFixed(2);
    jobmax.toFixed(0);
}
function update() {
    updateUI();
    function timer() {
        if (money < 1) {
            money = 1;
        }
        updateUI();
        delay += minus;
        if(delay >= delaymax) {
            increasemoney();
            delay = 0;
        }
        if(jobpoints >= jobmax) {
            moneyplus *= 1.6;
            jobmax *= 3;
        }
    }
    setInterval(timer, 500);
}
function job() {
    jobpoints += jobplus;
    money += moneyplus;
    updateUI();
}
function round_to_precision(val, decimals) {
    const postfixes = ["", "k", "M", "B", "T", "q", "Q", "s", "S", "O", "N", 
    "D", "Ud", "Dd", "Td", "qd", "Qd", "sd", "Sd", "Od", "Nd", 
    "V", "Uv", "Dv", "Tv", "qv", "Qv", "sv", "Sv", "Ov", "Nv"];    
    const components = val.toExponential(decimals).split("e");
    const roundValTo = (val, roundTo) => { return Math.floor(val/roundTo)*roundTo };
    const getPostFix = (exp) => { return postfixes[Math.floor(exp/3)] };
    let [str, exp] = components;

    exp = parseInt(exp);

    str = (val / Math.pow(10, roundValTo(Math.max(0, exp), 3))).toFixed(decimals) + getPostFix(Math.max(0, exp));

    return str;
}
window.onload = update;