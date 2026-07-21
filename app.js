// DND APP CORE

let dndBalance = Number(localStorage.getItem("dndBalance")) || 0;

let balances = {

DND: dndBalance,

USDT: Number(localStorage.getItem("usdt")) || 0,

BTC: Number(localStorage.getItem("btc")) || 0,

TRX: Number(localStorage.getItem("trx")) || 0

};


let transactions = JSON.parse(
localStorage.getItem("transactions")
) || [];


let mining = false;

let miningSpeed = 0.01;

let miningTimer = null;



function saveData(){

localStorage.setItem(
"dndBalance",
balances.DND
);


localStorage.setItem(
"usdt",
balances.USDT
);


localStorage.setItem(
"btc",
balances.BTC
);


localStorage.setItem(
"trx",
balances.TRX
);


localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

}





// переключение разделов

function showSection(id){

let pages = document.querySelectorAll(".page");


pages.forEach(function(page){

page.classList.add("hidden");

});


let section = document.getElementById(id);


if(section){

section.classList.remove("hidden");

}

}
// WALLET UPDATE

function updateWallet(){


let dnd = document.getElementById("dndBalance");

let usdt = document.getElementById("usdtBalance");

let btc = document.getElementById("btcBalance");

let trx = document.getElementById("trxBalance");



if(dnd){

dnd.innerHTML = balances.DND.toFixed(4);

}



if(usdt){

usdt.innerHTML = balances.USDT.toFixed(2);

}



if(btc){

btc.innerHTML = balances.BTC.toFixed(6);

}



if(trx){

trx.innerHTML = balances.TRX.toFixed(2);

}


}




// MINING SYSTEM


function startMining(){


if(mining){

return;

}


mining = true;



let status =
document.getElementById("miningStatus");



if(status){

status.innerHTML = "ACTIVE";

}



miningTimer = setInterval(function(){


balances.DND += miningSpeed;


saveData();


updateWallet();



},1000);



}




function stopMining(){


mining = false;



if(miningTimer){

clearInterval(miningTimer);

}


let status =
document.getElementById("miningStatus");



if(status){

status.innerHTML = "OFF";

}


}




function addTransaction(type,amount){


transactions.push({

type:type,

amount:amount,

date:new Date().toLocaleString()

});


saveData();

updateHistory();


}





// HISTORY


function updateHistory(){


let box =
document.getElementById("transactionHistory");



if(!box){

return;

}



if(transactions.length===0){

box.innerHTML =
"No transactions yet";

return;

}



box.innerHTML = "";


transactions.reverse().forEach(function(tx){


box.innerHTML += `

<div class="transaction">

<span>${tx.type}</span>

<span>${tx.amount}</span>

<span>${tx.date}</span>

</div>

`;


});


}
// EXCHANGE SYSTEM


function exchangeCurrency(){


let from =
document.getElementById("fromCurrency").value;


let to =
document.getElementById("toCurrency").value;


let amount =
Number(document.getElementById("exchangeAmount").value);



if(!amount || amount <= 0){

return;

}



if(balances[from] < amount){


let msg =
document.getElementById("exchangeMessage");


if(msg){

msg.innerHTML =
"Not enough balance";

}


return;

}




// простой тестовый курс

let result = amount;



balances[from] -= amount;


balances[to] += result;



addTransaction(

"Exchange " + from + " → " + to,

amount

);



updateWallet();



let msg =
document.getElementById("exchangeMessage");



if(msg){

msg.innerHTML =
"Exchange completed";

}


}





// DEPOSIT


function depositDND(amount){


amount = Number(amount);



if(!amount){

return;

}



balances.DND += amount;



addTransaction(

"Deposit",

amount

);



updateWallet();


}






// WITHDRAW


function withdrawDND(amount){


amount = Number(amount);



if(!amount){

return;

}



if(balances.DND < amount){

return;

}



balances.DND -= amount;



addTransaction(

"Withdraw",

amount

);



updateWallet();


}







// LOAD DATA WHEN PAGE STARTS


window.onload = function(){


updateWallet();


updateHistory();


};
