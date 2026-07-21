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
