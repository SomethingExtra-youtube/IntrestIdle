const TICK_LENGTH = 1000; // 1 second
const INTEREST_UPGRADE_FACTOR = 1.5;
const TICKLENGTH_UPGRADE_FACTOR = 5.4;
const JOB_EARNINGS_FACTOR = 0.85;
const JOB_COST_MULTIPLIER = 1.5;
const JOB_PRICE_FACTOR = 2.5;

let money = 1;
let intrest = 2;
let price = 1.05;
let price2 = 1.05;
let delay = delaymax = 60;
let minus = 1;
let moneyplus = 0.01;
let jobpoints = 1;
let jobmax = 50;
let jobprice = 50;
let jobplus = 1;

let lastTick = 0;

function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
}

function increasemoney() {
    updateUI();
    money += (money /= 100) * intrest;
}
function buy_interest_upgrade() {
    if(money >= price) {
       intrest += 1;
       money -= price;
       price *= INTEREST_UPGRADE_FACTOR; 
       updateUI();
    } else {
        console.log("Not enough money for upgrade");
    }
}
function buyupgrade2() {
    if(money >= price2) {
        minus += 1;
        money -= price2;
        price2 *= TICKLENGTH_UPGRADE_FACTOR; 
        updateUI();
     }
}
function buyupgrade3() {
    if(jobpoints >= jobprice) {
        jobplus += 1;
        jobpoints -= jobprice;
        jobprice = Math.floor(jobprice * JOB_PRICE_FACTOR);
        updateUI();
     }
}
function updateUI() {
    let interest_to_pay = money * intrest/100;
    document.getElementById("delay").textContent = `Interest pays in: ${clamp(delay, 0, 60)} seconds (+$${round_to_precision(interest_to_pay,2)})`;
    document.getElementById("clicks").textContent = `Your Money: $${round_to_precision(money, 2)}`;
    document.getElementById("intrest").textContent = `Interest: %${intrest}`;
    document.getElementById("upgradesP").textContent = `Price: $${round_to_precision(price, 2)}`;
    document.getElementById("upgradesP2").textContent = `Price: $${round_to_precision(price2, 2)}`;
    document.getElementById("skill").textContent = `Skill points: ${jobpoints}/${jobmax} till promotion!!`;
    document.getElementById("jobpri").textContent = `Price: ${jobprice} skill points`;
    document.querySelector("#btn_work").textContent = `Do your job (+${jobplus} skill points)`;
}
function update() {

    function timer() {
        lastTick = lastTick || Date.now();
        let delta = Date.now() - lastTick;
        if (delta >= TICK_LENGTH) {
            delay -= minus;
            clamp(delay, 0, delaymax);
            if(delay <= 0) {
                increasemoney();
                delay = delaymax;
            }
            lastTick = Date.now();
            updateUI();
        }
    }
    setInterval(timer, 100);

    updateUI();
}
function job() {
    jobpoints += jobplus;
    money += moneyplus;

    if(jobpoints >= jobmax) {
        moneyplus *= JOB_EARNINGS_FACTOR*jobplus;
        jobmax = Math.floor(jobmax * JOB_COST_MULTIPLIER);
        jobpoints = 0;
    }

    updateUI();
}
window.onload = update;

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