// Cria e exibe uma notificação simples (tipo: success | error | info)
export const notify = (message, type = "info") => {
  const containerId = "notification-container";
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.marginTop = "10px";
  notification.style.padding = "10px 16px";
  notification.style.borderRadius = "6px";
  notification.style.fontSize = "15px";
  notification.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
  notification.style.color = "white";
  notification.style.transition = "opacity 0.3s ease-in-out";

  switch (type) {
    case "success":
      notification.style.backgroundColor = "#16a34a";
      break;
    case "error":
      notification.style.backgroundColor = "#dc2626";
      break;
    case "warning":
      notification.style.backgroundColor = "#f59e0b";
      break;
    default:
      notification.style.backgroundColor = "#2563eb";
  }

  container.appendChild(notification);

  // Remove automaticamente após 3 segundos
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};
