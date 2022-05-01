/* this variable keeps track of the money starting value is 200$*/

let money = 200;

/* --------------This section is about the interaction between the meter and the bottle ---------------------------------------------------------------- */

const lever = document.querySelector(".lever");
const bottle = document.querySelector(".bottle");
const meter = document.querySelector(".meter");
const moneyCss = document.querySelector(".money-box")

/* clicking on the bottle removes points from sober meter  and removes removes cash */

let fullMeter = 300;

function subtractFromMeterAndMoney() {
        /*check if theres enough money left for a drink and if not too drunkbefore subtracting from the meter */
        if (money >= 5 && fullMeter >= 20) {
                fullMeter -= 20;
                meter.style.width = fullMeter + "px";
                money -= 5;
                moneyCss.innerHTML = money + "$";
        }
}

/* executed variable makes sure that the following function is executed only once, to prevent stacking */

let executed = false;

/*if meter is less than full, return to being full incrementally*/

function incrementMeter() {
        
        if (!executed) {
                executed = true;
                setInterval(() => {
                        if (fullMeter == 300) {
                          clearInterval();
                        } else {
                          fullMeter ++;
                          meter.style.width = fullMeter + "px";
                        }
                      }, 100);
        }
}

bottle.addEventListener("click", subtractFromMeterAndMoney);
bottle.addEventListener("click", incrementMeter);
;

/*-----------------------This section is about the lever and the Slot machine--------------------*/

function pullLever(event) {
        event.target.style.height = "100px";
        
};

function resetLever(event) {
                setTimeout(() => {event.target.style.height = "200px"}, 300);
};

lever.addEventListener("click", pullLever);
lever.addEventListener("click", resetLever);

