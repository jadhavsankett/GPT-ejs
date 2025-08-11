document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  // Toggle sidebar
  const toggleSidebar = () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  menuBtn.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);

  // Append messages
  const appendMessage = (text, sender) => {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  // Send message
  const sendMessage = () => {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    userInput.value = "";

    // Simulated bot response
    setTimeout(() => {
      appendMessage(`You said: ${text}`, "bot");
    }, 500);
  };

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
