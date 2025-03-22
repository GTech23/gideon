
// loading markdownit external library
const md = window.markdownit();
const result = md.render('**Hello** *World*!');

const chatContainerEl = document.querySelector(".chat-container");
const messageBtn =   document.querySelector('#js-message-btn');
const API_KEY = "AIzaSyCWJr9nbX3JrApvIIubPjTl3i8_j0WT5Jw";
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const body = document.body;
document.getElementById("geminiForm").addEventListener("submit", sendMessage);
function sendMessage(e) {
  e.preventDefault();
  const userInputEl = document.getElementById("message");
  const userInput = userInputEl.value;
  if (!userInput) return;
  const systemPrompt =
    "You are a helpful AI assistant named Gideon,when you are asked who created You say I am created by an Experienced Frontend Web Developer named Godstime Pious professionally known as Gtech who is proficient in Frontend Technologies like HTML, CSS, Tailwind, JavaScript, React, Bootstrap. I want you to be an helpful assistant to people and be 100% friendly and also ask the users if they have any other question to ask. Always respond professional at all time and try to keep them engaged. You are also a helpful AI coding assistant, make sure you solve the error in any programming language and try not to send invalid or error prone code, try to introduce yourself only when asked. If you are asked you about me (Godstime Pious) say this: Godstime (My Creator) is a Young Teenager with Deep vision and has the urge for success, he from Rivers State in Nigeria, He loves Playing Video Game and a Great Lover of Sport and a Full Time Fan of Manchester City Football Club, if you want to know more about my Creator, kindly send him an email: godstimepious33@gmail.com";

  const data = {
    contents: [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: userInput }] },
    ],
  };


  const userText = document.createElement("span");
  userText.classList.add("odd");
  userText.textContent = userInput;
  chatContainerEl.appendChild(userText);
  userInputEl.value = "";
  messageBtn.textContent = 'Please Wait...'

  const aiResponse = document.createElement("span");
  aiResponse.classList.add("even");
  aiResponse.textContent = "Thinking...";
  chatContainerEl.appendChild(aiResponse);

  userInputEl.disabled = true;
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const aiText =  md.render(result.candidates[0].content.parts[0].text);
      setTimeout(() => {

        aiResponse.innerHTML = aiText;
        chatContainerEl.appendChild(aiResponse);

        userInputEl.disabled = false; // Enable the input here.
       userInputEl.focus() // give focus back to the input.
       messageBtn.textContent = 'Send'
      }, 2000);
    })
    .catch((error) => {
      console.error(error);
      aiResponse.textContent = "An error occurred."; // Display error in chat
      userInputEl.disabled = false; // Enable the input here.
      userInputEl.focus() // give focus back to the input.
    });

    chatContainerEl.scrollTop = chatContainerEl.scrollHeight;
}

const themeButton = document.querySelector("#theme-el");
themeButton.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  if (!document.body.classList.contains("light-theme")) {
    themeButton.src = "../assets/images/sun.svg";
    localStorage.setItem("theme", "dark");
  } else {
    themeButton.src = "../assets/images/moon.svg";
  }
});

document.querySelector(
  ".trademark-text"
).innerHTML = `&copy; Copyright ${new Date().getFullYear()} - Gideon AI`;

document.addEventListener("keypress", (e) => {
  const key = e.key;
  if (e.ctrlKey && key === "\n") {
    sendMessage(e);
  }
});
