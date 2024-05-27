const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const camera = document.querySelector('.camera');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Boss...");
    } else {
        speak("Good Evening Boss...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing SAT JARVIS developed by peddisetty venkat satvik...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes(" google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes(" youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes(" facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes(" twitter")) {
        window.open("https://twitter.com", "_blank");
        speak("Opening Twitter...");
    } else if (message.includes(" instagram")) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes(" reddit")) {
        window.open("https://reddit.com", "_blank");
        speak("Opening Reddit...");
    } else if (message.includes(" linkedin")) {
        window.open("https://linkedin.com", "_blank");
        speak("Opening LinkedIn...");
    } else if (message.includes(" pinterest")) {
        window.open("https://pinterest.com", "_blank");
        speak("Opening Pinterest...");
    } else if (message.includes(" github")) {
        window.open("https://github.com", "_blank");
        speak("Opening GitHub...");
    } else if (message.includes(" stack overflow")) {
        window.open("https://stackoverflow.com", "_blank");
        speak("Opening Stack Overflow...");
    } else if (message.includes(" spotify")) {
        window.open("https://spotify.com", "_blank");
        speak("Opening Spotify...");
    } else if (message.includes(" netflix")) {
        window.open("https://netflix.com", "_blank");
        speak("Opening Netflix...");
    } else if (message.includes(" amazon")) {
        window.open("https://amazon.com", "_blank");
        speak("Opening Amazon...");
    } else if (message.includes(" ebay")) {
        window.open("https://ebay.com", "_blank");
        speak("Opening eBay...");
    } else if (message.includes(" wikipedia")) {
        window.open("https://en.wikipedia.org/wiki/" + message.replace("wikipedia", "").trim(), "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open("https://www.google.com/search?q=" + message.replace(" ", "+"), "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        speak("Opening Calculator");
    } else if (message.includes('set alarm')) {
        const alarmTime = message.replace('set alarm for ', '').trim();
        speak("Setting an alarm for " + alarmTime);
        
    } else if (message.includes('set timer')) {
        const timerDuration = message.replace('set timer for ', '').trim();
        speak("Setting a timer for " + timerDuration + " minutes");
        
    } else if (message.includes('open camera')) {
        openCamera();
    } else if (message.includes('take screenshot')) {
        takeScreenshot();
    } else {
        window.open("https://www.google.com/search?q=" + message.replace(" ", "+"), "_blank");
        speak("I found some information for " + message + " on Google");
    }
}

function openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            camera.srcObject = stream;
            camera.style.display = 'block';
            speak("Camera is now open.");
        })
        .catch(error => {
            speak("An error occurred while trying to open the camera.");
            console.error("Error opening camera: ", error);
        });
}

function takeScreenshot() {
    html2canvas(document.body).then(canvas => {
        const base64image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = base64image;
        link.download = 'screenshot.png';
        link.click();
        speak("Screenshot taken.");
    }).catch(error => {
        speak("An error occurred while taking the screenshot.");
        console.error("Error taking screenshot: ", error);
    });
}
