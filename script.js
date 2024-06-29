let currentStep = 1;
const totalSteps = 5;
let intervalId;

function nextThumbnail() {
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep = currentStep % totalSteps + 1;
    document.getElementById(`step${currentStep}`).style.display = 'block';
}

function autoSwitch() {
    intervalId = setInterval(() => {
        nextThumbnail();
    }, 7000);
}

autoSwitch();

function openIndex() {
    window.location.href = "index.html";
}