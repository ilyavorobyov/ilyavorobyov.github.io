// @ts-nocheck
// Функция копирования в буфер обмена
async function copyToClipboard(text) {
  if (!text) return false; // Проверка на null/undefined

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback для старых браузеров
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      return true;
    } catch (fallbackErr) {
      console.error("Ошибка копирования: ", fallbackErr);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

// Обработчик для всех кнопок копирования
document.addEventListener("DOMContentLoaded", function () {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      // Явно указываем тип для this
      const buttonElement = /** @type {HTMLElement} */ (this);

      // Проверяем, что текст не null
      const textToCopy = buttonElement.getAttribute("data-text");
      if (!textToCopy) {
        console.error("Текст для копирования не найден");
        return;
      }

      const success = await copyToClipboard(textToCopy);

      if (success) {
        const originalHtml = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i>';
        buttonElement.classList.add("copied");

        setTimeout(() => {
          buttonElement.innerHTML = originalHtml;
          buttonElement.classList.remove("copied");
        }, 900);
      }
    });
  });
});
