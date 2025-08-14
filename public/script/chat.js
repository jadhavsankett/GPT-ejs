document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const closeSidebar = document.getElementById("closeSidebar"); // FIXED

  const socket = io(); // make sure socket.io is loaded

  const toggleSidebar = (state) => {
    if (state === "open") {
      sidebar.classList.add("active");
      overlay.classList.add("active");
    } else {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    }
  };

  menuBtn.addEventListener("click", () => toggleSidebar("open"));
  closeSidebar.addEventListener("click", () => toggleSidebar("close"));
  overlay.addEventListener("click", () => toggleSidebar("close"));

  const appendMessage = (text, sender) => {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  const sendMessage = () => {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    userInput.value = "";

    socket.emit('ai-message', text);
  };

  socket.on('ai-message-response', (message) => {
    appendMessage(message, "assistant");
  });

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
