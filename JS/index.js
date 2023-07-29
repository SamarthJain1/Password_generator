const slider = document.querySelector("#slider");
let pass_length = slider.value;

const strength = document.querySelector(".strength");

slider.addEventListener("input", () => {
    pass_length = slider.value;
    document.querySelector(".len").innerHTML = pass_length;
    showStrength();
})

document.querySelector("ion-icon").addEventListener("click", async () => {
    let passwordText = document.querySelector(".pass").value;
    try {
        await navigator.clipboard.writeText(passwordText);
        let copiedElement = document.querySelector(".copied");
        copiedElement.classList.add("show");
        setTimeout(() => copiedElement.classList.remove("show"), 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
});



const checks = document.querySelectorAll(".check");

const upper = checks[0];
const lower = checks[1];
const number = checks[2];
const symbol = checks[3];

const upp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const low = upp.toLowerCase();
const num = "0123456789";
const sym = "~!@#$%^&*()_+-=[]{}|;:,.<>?/";

checks.forEach((check) => {
    check.addEventListener("change", () => {
        showStrength();
    });
});


function random(charSet) {
    return charSet.charAt(Math.floor(charSet.length * Math.random()));
}

function random_string() {
    let str = "";
    if (upper.checked) str += upp;
    if (lower.checked) str += low;
    if (number.checked) str += num;
    if (symbol.checked) str += sym;

    return str;
}

function password() {
    let pass = "";
    const str = random_string();

    if (str === '') {
        alert('Please select at least one checkbox option!');
        return '';
    }

    for (let i = 0; i < pass_length; i++) {
        pass += random(str);
    }
    return pass;
}

function check_strength() {
    let typesCount = 0;
    if (upper.checked) typesCount++;
    if (lower.checked) typesCount++;
    if (symbol.checked) typesCount++;
    if (number.checked) typesCount++;

    if (pass_length >= 12 && typesCount >= 3) {
        return "strong";
    } else if (pass_length >= 8 && typesCount >= 2) {
        return "medium";
    } else return "weak";
}

function showStrength() {
    let stren = check_strength();
    strength.innerHTML = stren;
    if (stren == "strong") strength.style.color = "#29e500";
    else if (stren == "medium") strength.style.color = "yellow";
    else if (stren == "weak") strength.style.color = "red";
}


document.querySelector(".generate").addEventListener("click", () => {
    document.querySelector(".pass").value = password();
    showStrength();
});