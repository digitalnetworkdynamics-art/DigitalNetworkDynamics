// DND MAIN APPLICATION


console.log("Digital Network Dynamics loaded");



// USER DATA

let user = {

    DND: 0,

    USDT: 0,

    BTC: 0,

    TRX: 0

};




// APPLICATION START

document.addEventListener(
"DOMContentLoaded",
function(){


    console.log(
    "DND ecosystem initialized"
    );


    loadUser();

updateWallet();


});





// SAVE USER DATA

function saveUser(){


localStorage.setItem(

"DND_user",

JSON.stringify(user)

);


}





// LOAD USER DATA

function loadUser(){


let saved =
localStorage.getItem(
"DND_user"
);



if(saved){


user =
JSON.parse(saved);


}


console.log(user);


}
// UPDATE WALLET DISPLAY

function updateWallet(){


let dnd =
document.getElementById(
"dndBalance"
);


let usdt =
document.getElementById(
"usdtBalance"
);


let btc =
document.getElementById(
"btcBalance"
);


let trx =
document.getElementById(
"trxBalance"
);



if(dnd){

dnd.innerHTML =
user.DND.toFixed(4);

}



if(usdt){

usdt.innerHTML =
user.USDT.toFixed(4);

}



if(btc){

btc.innerHTML =
user.BTC.toFixed(8);

}



if(trx){

trx.innerHTML =
user.TRX.toFixed(4);

}



}




// DEMO ADD BALANCE FUNCTION

function addDemoDND(amount){


user.DND += amount;


saveUser();


console.log(
"DND added:",
amount
);


}






// SIMPLE NAVIGATION

function openPage(page){


console.log(
"Opening:",
page
);


}
function showSection(id){


let pages =
document.querySelectorAll(".page");


pages.forEach(function(page){

page.classList.add("hidden");

});



let active =
document.getElementById(id);



if(active){

active.classList.remove("hidden");

}



}
let miningInterval;


function startMining(){


document.getElementById(
"miningStatus"
).innerHTML="ACTIVE";


document.getElementById(
"miningMessage"
).innerHTML=
"Mining started";


miningInterval =
setInterval(function(){


user.DND += 0.01;


saveUser();

updateWallet();


},1000);


}



function stopMining(){


clearInterval(miningInterval);



document.getElementById(
"miningStatus"
).innerHTML="OFF";


document.getElementById(
"miningMessage"
).innerHTML=
"Mining stopped";


}
function exchangeCurrency(){


let from =
document.getElementById(
"fromCurrency"
).value;



let to =
document.getElementById(
"toCurrency"
).value;



let amount =
Number(
document.getElementById(
"exchangeAmount"
).value
);



if(!amount || amount<=0){

document.getElementById(
"exchangeMessage"
).innerHTML=
"Enter amount";

return;

}



if(user[from] < amount){

document.getElementById(
"exchangeMessage"
).innerHTML=
"Not enough balance";

return;

}


// DEMO RATE

let result =
amount;



user[from]-=amount;

user[to]+=result;


saveUser();

updateWallet();



document.getElementById(
"exchangeMessage"
).innerHTML=
"Exchange completed";


}
