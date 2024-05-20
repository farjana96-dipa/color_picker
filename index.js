

/**
 * Globals Variable
 * 
 */

let div = null;


// Onload Handler

window.onload = ()=>{
    main();
}



// main function

function main(){

    const randomColorBtn = document.getElementById("rdColorBtn");
    const hexCode =  document.querySelector("#hex-code");
    const rgbCode = document.getElementById("rgb-code");
    const colorDisplay =  document.getElementById("color-display");
    const slideRed = document.getElementById("slide_red");
    const slideGreen = document.getElementById("slide_green");
    const slideBlue = document.getElementById("slide_blue");
    const cpyBtn = document.getElementById("copyBtn");
    const colorMode = document.getElementsByName("color-mode");
    
    //console.log(getCheckValue(colorMode));

//Event Hanldlers

    // Random Color take

    randomColorBtn.addEventListener("click", function(){
        const color = generateRandomColor();

        updateColorCodetoDom(color);
    })

    //Hexcode input take

    hexCode.addEventListener("keyup", hexCodeInput);

    // Slider Value Change

    slideRed.addEventListener("change", sliderValue(slideRed,slideGreen,slideBlue));

    slideGreen.addEventListener("change", sliderValue(slideRed,slideGreen,slideBlue));

    slideBlue.addEventListener("change", sliderValue(slideRed,slideGreen,slideBlue));


   


    //copy to clipboard by copy button
  cpyBtn.addEventListener("click", function(){
    let mode = getCheckValue(colorMode);
    if(mode == null){
        throw new Error("Invalid Mode");
    }
    else if(mode == "hex"){
        navigator.clipboard.writeText(`${hexCode.value}`);
        if(div != null){
            div.remove();
            div = null;
        }
        let hexCol = hexCode.value.substr(1,6);
        if(isValidHex(hexCol)){
            generateTostmsg(`#${hexCol} copied`);
        }
        else{
            alert("Hex Value is Invalid!!!");
        }
    }
    else{
        let hex = hexCode.value.substr(1,6);

        let r = parseInt(hex.substr(0,2),16);
        let g = parseInt(hex.substr(2,2),16);
        let b = parseInt(hex.substr(4,2),16);

        navigator.clipboard.writeText(`RGB(${r},${g},${b})`);
        if(div != null){
            div.remove();
            div = null;
        }
        generateTostmsg(`RGB(${r},${g},${b}) copied`) ;   
    }
    
       
    });

   



    
    
}




//DOM Functions

/**
 * @params {array}
 * @returns {checkedvalue}
 */
function getCheckValue(nodes){
    let checkValue = null;
    for(let i = 0; i<nodes.length; i++){
        if(nodes[i].checked){
            checkValue = nodes[i].value;
            break;
        }
    }
    return checkValue;
}

/**
 * 
 * @param {event} e
 * @return {object} 
 */
function hexCodeInput(e){
    
    const color = e.target.value;
    if(color){
        this.value = color.toUpperCase();
        if(isValidHex(color)){
           
            const col = hexToDecimal(color);
            updateColorCodetoDom(col);
        }
       
    }
}

/**
 * 
 * @param {value} color
 * @return {updateColorCodetoDom} 
 */

function sliderValue(slideRed, slideGreen, slideBlue){
   return function () {
    const color = {
        red : parseInt(slideRed.value),
        green : parseInt(slideGreen.value),
        blue : parseInt(slideBlue.value)
    };
    updateColorCodetoDom(color);
   };
}



//Utils

// Generate Toast Message 

function generateTostmsg(msg){
    div = document.createElement("div");
    div.innerText = msg;
    div.className = "toast-message toast-message-slide-in";
    div.addEventListener("click",function(){
        div.classList.remove("toast-message-slide-in");
        div.classList.add("toast-message-slide-out");

        div.addEventListener("animationend", function(){
            div.remove();
        })
    })
    document.body.appendChild(div);
}

//Convert Hex to Decimal Color

function hexToDecimal(hex){

    let red = parseInt(hex.substr(0,2),16);
    let green = parseInt(hex.substr(2,2),16);
    let blue = parseInt(hex.substr(4,2),16);


    return{
        red,green,blue
    }
}



// Generate Random Color

function generateRandomColor(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return{
        red,green,blue
    }
}
// Generate RGB Color

function randomRGBcolor(color){

    return `rgb(${color.red},${color.green},${color.blue})`;
}


/* HexadecimalColor generator */
function HexadecimalColor(color){

    return `#${color.red.toString(16)}${color.green.toString(16)}${color.blue.toString(16)}`.toUpperCase();
}


/* Check the hex color validity */

function isValidHex(color){

    if(color.length < 6) return false;
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}





// update dom elements with color 

function updateColorCodetoDom(color){

    const hexColor = HexadecimalColor(color);
   const rgbColor = randomRGBcolor(color);


   document.getElementById("color-display").style.backgroundColor = hexColor;
   
   document.getElementById("hex-code").value = hexColor;
   document.getElementById("rgb-code").value = rgbColor;
   
   document.getElementById("slide_red_label").innerText = color.red;
   document.getElementById("slide_red").value = color.red;
   document.getElementById("slide_green_label").innerText = color.green;
   document.getElementById("slide_green").value = color.green;
   document.getElementById("slide_blue_label").innerText = color.blue;
   document.getElementById("slide_blue").value = color.blue;

   
}


