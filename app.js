// DND DIGITAL NETWORK DYNAMICS
// CORE SYSTEM


const defaultData = {

DND:0,

USDT:0,

BTC:0,

ETH:0,

TRX:0,

transactions:[],

language:"en",

miningTime:0,

miningLevel:1,

miningSpeed:0.01

};





let walletData =
JSON.parse(
localStorage.getItem("DND_DATA")
)
||
defaultData;






function saveData(){

localStorage.setItem(

"DND_DATA",

JSON.stringify(walletData)

);

}





// PAGE SYSTEM
// reload navigation



function openPage(page){


window.location.hash = page;


location.reload();


}






function loadPage(){


let current =

window.location.hash.replace("#","")
||
"home";



let pages =
document.querySelectorAll(".page");



pages.forEach(function(page){


page.classList.add("hidden");


});




let active =
document.getElementById(current);



if(active){


active.classList.remove("hidden");


}

}



window.addEventListener(

"load",

loadPage

);





// LANGUAGE SAVE


let languageSelect =
document.getElementById(
"languageSelect"
);



if(languageSelect){


languageSelect.value =
walletData.language;



languageSelect.addEventListener(

"change",

function(){


walletData.language =
this.value;


saveData();


}

);


}
// WALLET SYSTEM



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



let eth =
document.getElementById(
"ethBalance"
);



let trx =
document.getElementById(
"trxBalance"
);






if(dnd){

dnd.innerHTML =
walletData.DND.toFixed(4);

}




if(usdt){

usdt.innerHTML =
walletData.USDT.toFixed(2);

}




if(btc){

btc.innerHTML =
walletData.BTC.toFixed(6);

}




if(eth){

eth.innerHTML =
walletData.ETH.toFixed(6);

}




if(trx){

trx.innerHTML =
walletData.TRX.toFixed(2);

}




}





// FORCE CLEAN OLD TEST BONUSES


function resetDemoBalances(){


walletData.USDT = 0;

walletData.BTC = 0;

walletData.ETH = 0;

walletData.TRX = 0;


saveData();


updateWallet();


}




// RUN UPDATE


window.addEventListener(

"load",

function(){


updateWallet();


}

);
// MINING SYSTEM


let miningActive = false;

let miningInterval = null;





function startMining(){



if(miningActive){

return;

}



miningActive = true;



let status =
document.getElementById(
"miningStatus"
);



if(status){

status.innerHTML = "ACTIVE";

status.className =
"status-active";

}




miningInterval = setInterval(function(){



walletData.DND += 
walletData.miningSpeed;



walletData.miningTime += 1;



// повышение уровня


if(walletData.DND >= walletData.miningLevel * 100){


walletData.miningLevel++;


}





saveData();


updateWallet();


updateMiningInfo();



},1000);



}





function stopMining(){



miningActive = false;



if(miningInterval){


clearInterval(miningInterval);


}




let status =
document.getElementById(
"miningStatus"
);



if(status){

status.innerHTML = "OFF";

status.className =
"status-off";

}



}






function updateMiningInfo(){



let speed =
document.getElementById(
"miningSpeed"
);



let time =
document.getElementById(
"miningTime"
);



let level =
document.getElementById(
"miningLevel"
);




if(speed){

speed.innerHTML =
walletData.miningSpeed.toFixed(3)
+
" DND / sec";

}




if(time){

time.innerHTML =
walletData.miningTime
+
" seconds";

}




if(level){

level.innerHTML =
walletData.miningLevel;

}



}







function boostMining(){



walletData.miningSpeed += 0.01;



saveData();



updateMiningInfo();



}



window.addEventListener(

"load",

function(){


updateMiningInfo();


}

);
// EXCHANGE SYSTEM



function addTransaction(type, amount){



walletData.transactions.push({


type:type,


amount:amount,


date:new Date().toLocaleString()


});



saveData();



updateHistory();



}








function exchangeCurrency(){



let from =
document.getElementById(
"exchangeFrom"
).value;



let to =
document.getElementById(
"exchangeTo"
).value;



let amount =
Number(
document.getElementById(
"exchangeAmount"
).value
);





if(!amount || amount <= 0){

return;

}




if(walletData[from] < amount){


showExchangeMessage(
"Not enough balance"
);


return;


}




// TEST RATE SYSTEM
// позже подключим реальные курсы



walletData[from] -= amount;


walletData[to] += amount;




addTransaction(

"Exchange " 
+
from
+
" → "
+
to,

amount

);



updateWallet();



showExchangeMessage(
"Exchange completed"
);



}








function showExchangeMessage(text){



let box =
document.getElementById(
"exchangeMessage"
);



if(box){

box.innerHTML = text;

}



}









// HISTORY DISPLAY




function updateHistory(){



let box =
document.getElementById(
"transactionHistory"
);




if(!box){

return;

}




if(walletData.transactions.length === 0){


box.innerHTML =
"No transactions yet";


return;


}




box.innerHTML = "";




walletData.transactions
.slice()
.reverse()
.forEach(function(tx){



box.innerHTML += `


<div class="transaction">


<strong>

${tx.type}

</strong>


<span>

${tx.amount}

</span>


<small>

${tx.date}

</small>


</div>


`;



});



}





window.addEventListener(

"load",

function(){


updateHistory();


}

);
// WALLET ACTIONS




const dndAddress =
"DND-8F92-A7C4-2026";






function copyAddress(){



navigator.clipboard.writeText(
dndAddress
);



alert(
"Address copied"
);



}








function depositDND(){



let input =
document.getElementById(
"depositAmount"
);



let amount =
Number(input.value);




if(!amount || amount <=0){

return;

}




walletData.DND += amount;




addTransaction(

"Deposit DND",

amount

);



saveData();


updateWallet();



input.value = "";



}









function withdrawDND(){



let amount =
Number(
document.getElementById(
"withdrawAmount"
).value
);




if(!amount || amount<=0){

return;

}




if(walletData.DND < amount){


alert(
"Insufficient DND balance"
);


return;


}




walletData.DND -= amount;




addTransaction(

"Withdraw DND",

amount

);




saveData();


updateWallet();



document.getElementById(
"withdrawAmount"
).value = "";



}









// INITIAL START



window.addEventListener(

"load",

function(){


updateWallet();


updateHistory();


updateMiningInfo();


}

);
// FINAL SYSTEM CHECK



document.addEventListener(

"DOMContentLoaded",

function(){


updateWallet();


updateHistory();


updateMiningInfo();



});







// PREVENT EMPTY DATA RESET



if(!localStorage.getItem("DND_DATA")){


saveData();


}
// ==========================
// DND MULTI LANGUAGE SYSTEM
// ==========================


const translations = {


en: {

home: "Home",
wallet: "Wallet",
mining: "Mining",
exchange: "Exchange",
history: "History",
roadmap: "Roadmap",
team: "Team",

title:
"Digital Network Dynamics",

subtitle:
"The Future Of Digital Dynamics",

walletTitle:
"DND Wallet",

miningTitle:
"DND Mining",

exchangeTitle:
"Exchange",

support:
"Support Center",

supportText:
"Need help? Contact our support team",

startMining:
"Start Mining",

stopMining:
"Stop",

deposit:
"Deposit",

withdraw:
"Withdraw"

},



fr: {

home: "Accueil",
wallet: "Portefeuille",
mining: "Minage",
exchange: "Échange",
history: "Historique",
roadmap: "Feuille de route",
team: "Équipe",

title:
"Digital Network Dynamics",

subtitle:
"L'avenir des technologies numériques",

walletTitle:
"Portefeuille DND",

miningTitle:
"Minage DND",

exchangeTitle:
"Échange",

support:
"Centre de support",

supportText:
"Besoin d'aide ? Contactez notre équipe",

startMining:
"Commencer le minage",

stop:
"Arrêter",

deposit:
"Dépôt",

withdraw:
"Retrait"

},



zh: {

home:"主页",
wallet:"钱包",
mining:"挖矿",
exchange:"兑换",
history:"历史",
roadmap:"路线图",
team:"团队",

title:
"数字网络动态",

subtitle:
"未来数字生态系统",

walletTitle:
"DND钱包",

miningTitle:
"DND挖矿",

exchangeTitle:
"兑换中心",

support:
"支持中心",

supportText:
"需要帮助？联系我们",

startMining:
"开始挖矿",

stop:
"停止",

deposit:
"充值",

withdraw:
"提现"

},



pl: {

home:"Strona główna",
wallet:"Portfel",
mining:"Kopanie",
exchange:"Wymiana",
history:"Historia",
roadmap:"Mapa drogowa",
team:"Zespół",

title:
"Digital Network Dynamics",

subtitle:
"Przyszłość cyfrowego ekosystemu",

walletTitle:
"Portfel DND",

miningTitle:
"Kopanie DND",

exchangeTitle:
"Wymiana",

support:
"Centrum wsparcia",

supportText:
"Potrzebujesz pomocy? Skontaktuj się z nami",

startMining:
"Rozpocznij kopanie",

stop:
"Stop",

deposit:
"Wpłata",

withdraw:
"Wypłata"

},



es: {

home:"Inicio",
wallet:"Billetera",
mining:"Minería",
exchange:"Intercambio",
history:"Historial",
roadmap:"Hoja de ruta",
team:"Equipo",

title:
"Digital Network Dynamics",

subtitle:
"El futuro del ecosistema digital",

walletTitle:
"Billetera DND",

miningTitle:
"Minería DND",

exchangeTitle:
"Intercambio",

support:
"Centro de soporte",

supportText:
"¿Necesitas ayuda? Contacta con nosotros",

startMining:
"Iniciar minería",

stop:
"Detener",

deposit:
"Depositar",

withdraw:
"Retirar"

}


};
// ==========================
// APPLY LANGUAGE
// ==========================


function applyLanguage(){



let lang = walletData.language || "en";



let text = translations[lang];



if(!text){

return;

}






document.querySelectorAll("[data-i18n]")
.forEach(function(element){



let key = element.getAttribute(
"data-i18n"
);



if(text[key]){


element.innerHTML =
text[key];


}



});



}









// ==========================
// LANGUAGE SELECT
// ==========================


const language =
document.getElementById(
"languageSelect"
);



if(language){



language.value =
walletData.language || "en";





language.addEventListener(

"change",

function(){



walletData.language =
this.value;



saveData();



applyLanguage();



}

);



}








window.addEventListener(

"load",

function(){


applyLanguage();


}

);





