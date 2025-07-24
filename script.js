function toggleChat() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
}

function suggest(text) {
  const input = document.getElementById("chatInput");
  input.value = text;
  handleKey({ key: "Enter" });
}

const faq = {
  "what services do you offer": "We offer aluminium and glass façade solutions, sliding windows, and fast site visits.",
  "do you provide after sales support": "Yes, we offer complete after-sales support after project delivery.",
  "where are you located": "We are based in Thane, Maharashtra.",
  "how to contact": "Call 9322803398 or email skenterprises672@gmail.com.",
  "what projects have you completed": "K Star Mall, Mall De Core, Circlips Technologies, Riddhi Siddhi Group, and more.",
};

const memory = {};

function handleKey(e) {
  if (e.key === "Enter") {
    const input = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const userText = input.value.trim();
    if (!userText) return;

    addMessage("user", userText);

    const lower = userText.toLowerCase();
    if (memory[lower]) {
      setTimeout(() => addMessage("bot", `You already asked that. Here's the answer again: ${memory[lower]}`), 500);
    } else {
      let reply = "Sorry, I didn't understand. Ask about services, location, or contact.";
      for (let key in faq) {
        if (lower.includes(key)) {
          reply = faq[key];
          memory[lower] = reply;
          break;
        }
      }
      setTimeout(() => addMessage("bot", reply), 500);
    }

    input.value = "";
  }
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  document.getElementById("chatMessages").appendChild(msg);
  document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
}
