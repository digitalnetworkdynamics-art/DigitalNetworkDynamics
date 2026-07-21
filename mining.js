let balance = 0;

function startMining(){

document.getElementById("miningStatus").innerHTML = "Active";

setInterval(function(){

balance += 0.000069;

document.getElementById("balance").innerHTML =
balance.toFixed(6) + " DND";

},1000);

}
