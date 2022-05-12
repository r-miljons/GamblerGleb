/* this variable keeps track of the money starting value is 20000$*/

let money = 20000;

/* animations of money changed */

let moneyAnimation = document.querySelector(".changed-money");
let changedAmount = document.querySelector(".changed-amount");

function addMoney(amount) {
        moneyAnimation.style.animation = "moneySlide 1000ms";
        moneyAnimation.style.color = "green";
        changedAmount.textContent = "+" + amount + "$";
        setTimeout(()=>{
                moneyAnimation.style.animation = "none";
        },1000);
}

function removeMoney(amount) {
        moneyAnimation.style.animation = "moneySlide 1000ms";
        moneyAnimation.style.color = "red";
        changedAmount.textContent = "-" + amount + "$";
        setTimeout(()=>{
                moneyAnimation.style.animation = "none";
        },1000);
}
/* if no money left */


let theEnd = document.querySelector(".the-end-container");



/* --------------This section is about the interaction between the meter and the bottle ---------------------------------------------------------------- */

const lever = document.querySelector(".lever");
const bottle = document.querySelector(".bottle");
const meter = document.querySelector(".meter");
const moneyCss = document.querySelector(".money")

/* clicking on the bottle removes points from sober meter  and removes removes cash */

let fullMeter = 100;

/* executed variable makes sure that the following function is executed only once, to prevent stacking */

let executed = false;

function beerClick() {
if (money > 0 && fullMeter >= 10) {
        function subtractFromMeterAndMoney() {
                /*check if theres enough money left for a drink and if not too drunk before subtracting from the meter */
                if (money > 0 && fullMeter >= 10) {
                        fullMeter -= 10;
                        meter.style.width = fullMeter + "%";
                        money -= 20;
                        if (money > 0) {
                                moneyCss.textContent = money + "$";
                        } else { 
                                moneyCss.textContent = "0$";
                                theEnd.style.display = "flex"; }
                }
        }

       subtractFromMeterAndMoney();

        /* animation of the money changed */

        removeMoney(20);
        

        

        /*if meter is less than full, return to being full incrementally*/

        function incrementMeter() {

                if (!executed) {
                        executed = true;
                        setInterval(() => {
                                if (fullMeter == 100) {
                                  clearInterval();
                                } else {
                                  fullMeter += 0.5;
                                  meter.style.width = fullMeter + "%";
                                }
                              }, 800);
                }
        }
        incrementMeter();
}
}

bottle.addEventListener("click", beerClick);
        

/* --------------Betting Section -------------------- */

const incrementButton = document.querySelector(".positive");
const decrementButton = document.querySelector(".negative");
const betAmount = document.querySelector(".bet-amount");

let currentBet = 20;

/* clicking the + button will increment the bet amount by 20 */

function incrementBet () {
        currentBet += 20;
        betAmount.textContent = currentBet;
}

/* holding the + button will increment the bet amount continuously by 20 */


 let positiveIncrement;
 let timeOut;

 function mouseDownPositive () { 
         mouseUp();
         timeOut = setTimeout(function () {
                 console.log("Mouse Down");
                 positiveIncrement = setInterval(() => {
                         currentBet += 20;
                         betAmount.textContent = currentBet; 
                 }, 100);
         }, 400);
 };

 /* same for - button but reversed */

 let negativeIncrement;

 function mouseDownNegative () { 
        mouseUp();
        timeOut = setTimeout(function () {
                console.log("Mouse Down");
                negativeIncrement = setInterval(() => {
                        if (currentBet > 20) { 
                                currentBet -= 20;
                                betAmount.textContent = currentBet; 
                        }
                }, 50);
        }, 400);
};

 function mouseUp () {
         if (timeOut) {
                 clearInterval(positiveIncrement);
                 clearInterval(negativeIncrement);
                 clearTimeout(timeOut);
         }
 };

 decrementButton.addEventListener("mousedown", mouseDownNegative);
 incrementButton.addEventListener("mousedown", mouseDownPositive);
 document.body.addEventListener("mouseup", mouseUp); 


incrementButton.addEventListener("click", incrementBet);

function decrementBet () {
        if (currentBet > 20) {
                currentBet -= 20;
                betAmount.textContent = currentBet;
        }
}

function holdDecrementBet () {
        setTimeout(function () {
                let intervalID = setInterval(() => {
                       currentBet -= 20; 
                }, 100);
        }, 400);
}


decrementButton.addEventListener("click", decrementBet);

/*-----------------------This section is about the lever and the Slot machine--------------------*/

function pullLever(event) {
        event.target.style.height = "100px";
        
};

function resetLever(event) {
                setTimeout(() => {event.target.style.height = "200px"}, 300);
};

const slots = document.querySelectorAll(".slots");

/* The huge function responsible for the slot machine, i think the correct way to do this is to turn slot machine into an object, not sure how */
// this Active variable prevents wierd bugs caused by spinning an already spinning slot machine
let machineActive = false;

function startSlotMachine() {

        if (!machineActive) {
                machineActive = true;
        
        
        /*will spin any slot (0-2) specified number of times (minimum of 1) */
        function spinTheSlots (slotNumber, spins) {
                let currentSpins = 0;
                /* amount of ms it takes to spin once */
                let speed = 200;
                let result = 0;
                let intervalID = setInterval(spin, speed, speed);
                
                
                
                
                /* one spin of a slot, takes miliseconds as an argument (the amount of time it takes to complete one revolution)*/
                function spin (ms) {
                        currentSpins++;
                        /* Ensures a random outcome on each spin - randomizes the first list element by selecting a random element and replacing that with the first one */
                         const elementA = document.querySelectorAll(".a")[slotNumber];
                         const elementB = document.querySelectorAll(".b")[slotNumber];
                         const elementC = document.querySelectorAll(".c")[slotNumber];
                         const elementD = document.querySelectorAll(".d")[slotNumber];

                         let randomNum = Math.floor(Math.random() * 4);
                         let firstElement = slots[slotNumber].children[0];
                         let secondElement = slots[slotNumber].children[1];
                         let thirdElement = slots[slotNumber].children[2];
                         let fourthElement = slots[slotNumber].children[3];
                         let dupedFirstElement = firstElement.cloneNode(true);
                
                         const randomDupeMaker = (randomNum) => {
                                 switch (randomNum) {
                                         case 0: return firstElement.cloneNode(true); break;
                                         case 1: return secondElement.cloneNode(true); break;
                                         case 2: return thirdElement.cloneNode(true); break;
                                         case 3: return fourthElement.cloneNode(true); break;
                                 }
                         }
                         let randomDupe = randomDupeMaker(randomNum);

                         firstElement.remove();
                         firstElement = randomDupe;
                         slots[slotNumber].insertBefore(randomDupe, secondElement);
                         if (randomNum == 1) {
                                 secondElement.remove();
                                 slots[slotNumber].insertBefore(dupedFirstElement, thirdElement);
                         } else if (randomNum == 2) {
                                 thirdElement.remove();
                                 slots[slotNumber].insertBefore(dupedFirstElement, fourthElement);
                         } else if (randomNum == 3) {
                                 fourthElement.remove();
                                 slots[slotNumber].appendChild(dupedFirstElement);
                         }

                        /* Animates the slot machine - moves the list upwards, appends a new list at the bottom of the current one, removes the current list  */ 
                        slots[slotNumber].style.animation = "slide " + ms + "ms linear forwards";
                        const dupe = slots[slotNumber].cloneNode(true);
                        setTimeout(() => {
                                switch (slotNumber) {
                                        case 0: document.querySelector(".one").appendChild(dupe); break;
                                        case 1: document.querySelector(".two").appendChild(dupe); break;
                                        case 2: document.querySelector(".three").appendChild(dupe); break;
                                }
                                dupe.style.animation = "none";     
                        }, (ms/4) * 3);
                        setTimeout(() => {
                                dupe.style.animation = "slide " + ms + "ms linear forwards";
                                switch (slotNumber) {
                                        case 0: document.querySelector(".one").removeChild(slots[slotNumber]); break;
                                        case 1: document.querySelector(".two").removeChild(slots[slotNumber]); break;
                                        case 2: document.querySelector(".three").removeChild(slots[slotNumber]); break;
                                }
                        }, ms);
                        setTimeout(() => {
                                switch (slotNumber) {
                                        case 0: document.querySelector(".one").appendChild(slots[slotNumber]); break;
                                        case 1: document.querySelector(".two").appendChild(slots[slotNumber]); break;
                                        case 2: document.querySelector(".three").appendChild(slots[slotNumber]); break;
                                }
                                slots[slotNumber].style.animation = "none";

                        }, ms + (ms/4) * 3);
                        setTimeout(() => {
                                switch (slotNumber) {
                                        case 0: document.querySelector(".one").removeChild(dupe); break;
                                        case 1: document.querySelector(".two").removeChild(dupe); break;
                                        case 2: document.querySelector(".three").removeChild(dupe); break;
                                }
                        }, ms * 2)
                        if (currentSpins == spins) {
                                
                                clearInterval(intervalID);
                                if (firstElement.className == elementA.className) {
                                        result ++;
                                        
                                } else if (firstElement.className == elementB.className) {
                                        result += 2;
                                        
                                } else if (firstElement.className == elementC.className) {
                                        result += 3;
                                        
                                } else if (firstElement.className == elementD.className) {
                                        result += 4;
                                        
                                }
                        
                        }
                            
                }

        /*this function returns the result of each slot to a variable for later comparison */
        
        setTimeout(() => { 
                if (slotNumber == 0) {
                        result1 = result;
                        timeTaken1 = spins*speed;
                } else if (slotNumber == 1) {
                        result2 = result;
                        timeTaken2 = spins*speed;
                } else if (slotNumber == 2) {
                        result3 = result;
                        timeTaken3 = spins*speed;
                }

                
        }, spins*speed+5); // added 5ms 

        }
        
        /* calling the function to spin the slots - probably a terrible way of doing this,
        I feel that a better way would be to turn this whole slotmachine into an object,
        instead of this wierd function ception
        Also! The third slot should always have the highest number of spins(the last number in the function call is spins) */
        // slot 1
        spinTheSlots(0,8);  
        // slot 2      
        spinTheSlots(1,15);
        // slot 3
        spinTheSlots(2,22);

        /* The result and time elapsed of each slot.
         I need to know the time elapsed for each
        spin because, because I couldn't think of a better way to ensure that the variables actually 
        hold the value I need other that using setTimeout, since the functions that assing values to these variables take time to execute,
        otherwise the variables would be undefined */
        // BROKEN! This Method does not work, because there is no value set for timeTaken by the time that setTimeout gets executed (instantly).
        let result1 = 0;
        let timeTaken1 = 0;

        let result2 = 0;
        let timeTaken2 = 0;

        let result3 = 0;
        let timeTaken3 = 4500; // temporary solution, cant adjust slot machine speed
        setTimeout(() => {
                console.log("result1: " + result1);
                console.log("result2: " + result2);
                console.log("result3: " + result3);
                console.log("Sober Meter:" + fullMeter);
        }, timeTaken3);

        let slot = document.querySelectorAll(".slot");

        slot[0].style.border = "4px solid black";
        slot[1].style.border = "4px solid black";
        slot[2].style.border = "4px solid black";

        // This function is responsible for evaluating the results of all the slots,
        // handling the money and it's relationship with the sober o meter.
        function compareResults () {

                        setTimeout(() => { machineActive = false; }, 400);
                
                        // all 3 slots are the same
                        if (result1 == result2 && result2 == result3) {
                                slot[0].style.border = "4px solid rgb(255, 255, 0)";
                                slot[1].style.border = "4px solid rgb(255, 255, 0)";
                                slot[2].style.border = "4px solid rgb(255, 255, 0)";
                                switch (true) {
                                        // every drink you take, multiplies your winnings for a certain amount of time
                                        case fullMeter < 10: {
                                                money += currentBet*40;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*40);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 20: {
                                                money += currentBet*35;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*35);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 30: {
                                                money += currentBet*30;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*30);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 40: {
                                                money += currentBet*29;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*29);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 50: {
                                                money += currentBet*28;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*28);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 60: {
                                                money += currentBet*27;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*27);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 70: {
                                                money += currentBet*26;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*26);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 80: {
                                                money += currentBet*24;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*24);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 90: {
                                                money += currentBet*20;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*20);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 100: {
                                                money += currentBet*15;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*15);
                                                        }, 400);
                                        }; break;
                                        case fullMeter == 100: {
                                                money += currentBet*10;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*10);
                                                        }, 400);
                                        }; break;
                                }
                        } 
                        // a pair of slots are the same
                        else if (result1 == result2 || result2 == result3) {
                                
                                switch (true) {
                                        
                                        case fullMeter < 10: {
                                                money += currentBet*20;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*20);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 20: {
                                                money += currentBet*19;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*19);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 30: {
                                                money += currentBet*18;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*18);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 40: {
                                                money += currentBet*17;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*17);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 50: {
                                                money += currentBet*14;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*14);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 60: {
                                                money += currentBet*13;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*13);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 70: {
                                                money += currentBet*12;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*12);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 80: {
                                                money += currentBet*11;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*11);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 90: {
                                                money += currentBet*8;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*8);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 100: {
                                                money += currentBet*7;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*7);
                                                        }, 400);
                                        }; break;
                                        case fullMeter == 100: {
                                                money += currentBet*6;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*6);
                                                        }, 400);
                                        }; break;
                                }
                                if (result1 == result2) {
                                        setTimeout(() => {slot[0].style.border = "4px solid rgb(21, 254, 0)"}, 400);
                                        setTimeout(() => {slot[1].style.border = "4px solid rgb(21, 254, 0)"}, 400);
                                } else if (result2 == result3) {
                                        setTimeout(() => {slot[1].style.border = "4px solid rgb(21, 254, 0)"}, 400);
                                        setTimeout(() => {slot[2].style.border = "4px solid rgb(21, 254, 0)"}, 400);
                                }
                        }
                        // two slots not next to each other are the same
                        else if (result1 == result3) {
                                
                                
                                switch (true) {
                                        case fullMeter < 10: {
                                                money += currentBet*7;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*7);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 20: {
                                                money += currentBet*6;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*6);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 30: {
                                                money += currentBet*5.5;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*5.5);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 40: {
                                                money += currentBet*5;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*5);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 50: {
                                                money += currentBet*4.5;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*4.5);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 60: {
                                                money += currentBet*4;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*4);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 70: {
                                                money += currentBet*3.5;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*3.5);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 80: {
                                                money += currentBet*3;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*3);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 90: {
                                                money += currentBet*2.5;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*2.5);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 100: {
                                                money += currentBet*2;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*2);
                                                        }, 400);
                                        }; break;
                                        case fullMeter == 100: {
                                                money += currentBet*1;
                                                moneyCss.textContent = money + "$";
                                                setTimeout(() => {
                                                        addMoney(currentBet*1);
                                                        }, 400);
                                        }; break;
                                        
                                }
                                setTimeout(() => {slot[0].style.border = "4px solid orange"}, 400);
                                setTimeout(() => {slot[2].style.border = "4px solid orange"}, 400);
                        } 
                        // no slots are the same
                        else {
                                
                                switch (true) {
                                        // every drink you take multiplies your winnings, BUT Also your losses!
                                        case fullMeter < 10: {
                                                money -= currentBet*20;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*20);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 20: {
                                                money -= currentBet*18;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*18);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 30: {
                                                money -= currentBet*17;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*17);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 40: {
                                                money -= currentBet*16;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*16);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 50: {
                                                money -= currentBet*14;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*14);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 60: {
                                                money -= currentBet*13;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*13);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 70: {
                                                money -= currentBet*11;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*11);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 80: {
                                                money -= currentBet*10;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*10);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 90: {
                                                money -= currentBet*8;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*8);
                                                        }, 400);
                                        }; break;
                                        case fullMeter < 100: {
                                                money -= currentBet*7;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*7);
                                                        }, 400);
                                        }; break;
                                        case fullMeter == 100: {
                                                money -= currentBet*5;
                                                if (money > 0) {  
                                                        moneyCss.textContent = money + "$";
                                                        } else { 
                                                        moneyCss.textContent = "0$";
                                                        theEnd.style.display = "flex";
                                                }
                                                setTimeout(() => {
                                                        removeMoney(currentBet*5);
                                                        }, 400);
                                        }; break;
                                }
                        }
                
        }

        setTimeout(compareResults, 4500);
        
        }
        
}

lever.addEventListener("click", pullLever);
lever.addEventListener("click", resetLever);
lever.addEventListener("click", startSlotMachine);

// ---------------- Tutorial Section ----------------

let tutorialOne = document.querySelector(".first");
let focusedSpotlight = document.querySelector(".focused");
let tutorialSteps = document.querySelectorAll(".step");
let nextButton = document.querySelectorAll(".next-step");
let skipButton = document.querySelectorAll(".skip-tutorial");

function showTutorial () {
        tutorialOne.style.display = "block";
        tutorialOne.style.animation = "appear 300ms";
        document.querySelector(".on-lever").style.display = "block";
        document.querySelector(".on-lever").style.animation = "appear 300ms, focus 3s infinite";
        document.querySelector(".lever").addEventListener("click", nextStep);
        setTimeout(() => {tutorialOne.style.animation = "none";}, 300);
}

window.onload = setTimeout(showTutorial, 1000);

let currentStep = 0;

function nextStep () {
        currentStep++;
        tutorialSteps[currentStep - 1].style.display = "none";
        if (currentStep < 5) {
        setTimeout(() => {
                tutorialSteps[currentStep].style.display = "block";
                tutorialSteps[currentStep].style.animation = "appear 300ms";
                setTimeout(() => {tutorialSteps[currentStep].style.animation = "none";}, 300);
        }, 200)
        }
        if (currentStep == 1) {
                document.querySelector(".on-lever").style.display = "none";
                document.querySelector(".lever").removeEventListener("click", nextStep);
                document.querySelector(".on-beer").style.display = "block";
                document.querySelector(".bottle").addEventListener("click", nextStep);
        }
        if (currentStep == 2) {
                document.querySelector(".sober-box").style.boxShadow = "0 0 0 9999px rgba(0, 0, 0, .3)";
                document.querySelector(".sober-box").style.WebkitBoxShadow = "0 0 0 9999px rgba(0, 0, 0, .3)";
                document.querySelector(".sober-box").style.MozBoxShadow = "0 0 0 9999px rgba(0, 0, 0, .3)";
                document.querySelector(".on-beer").style.display = "none";
                document.querySelector(".bottle").removeEventListener("click", nextStep);
        } else { 
                document.querySelector(".sober-box").style.boxShadow = "none";
                document.querySelector(".sober-box").style.WebkitBoxShadow = "none";
                document.querySelector(".sober-box").style.MozBoxShadow = "none";
        }
        if (currentStep == 3) {
                document.querySelector(".on-bet").style.display = "block";
                document.querySelector(".bettings").addEventListener("click", nextStep);
        }
        if (currentStep == 4) {
                document.querySelector(".on-bet").style.display = "none";
                document.querySelector(".bettings").removeEventListener("click", nextStep);
        }
}

function skipTutorial () {
        tutorialSteps[currentStep].style.display = "none";
        focusedSpotlight.style.display = "none";
        document.querySelector(".on-lever").style.display = "none";
        document.querySelector(".on-beer").style.display = "none";
        document.querySelector(".on-bet").style.display = "none";
        document.querySelector(".sober-box").style.boxShadow = "none";
        document.querySelector(".lever").removeEventListener("click", nextStep);
        document.querySelector(".bottle").removeEventListener("click", nextStep);
        document.querySelector(".bettings").removeEventListener("click", nextStep);
}

nextButton[currentStep].addEventListener("click", nextStep);
skipButton[currentStep].addEventListener("click", skipTutorial);
// for some reason this stops working, so i just typed out each button, i think it's because it doesn't use the latest current step value.
nextButton[1].addEventListener("click", nextStep);
nextButton[2].addEventListener("click", nextStep);
nextButton[3].addEventListener("click", nextStep);

skipButton[1].addEventListener("click", skipTutorial);
skipButton[2].addEventListener("click", skipTutorial);
skipButton[3].addEventListener("click", skipTutorial);
skipButton[4].addEventListener("click", skipTutorial);

/* the code I found online to fix this problem 

var buttons = document.querySelectorAll(".color-buttons button");
var color_name = document.getElementById("color-name");

buttons.forEach(function(btn){
  btn.addEventListener("click", function(){
    color_name.style.background=this.id;
    color_name.innerHTML=this.id;
  });
});

*/





