export function darkModeToggle() {
  const toggle = document.querySelector("#darkModeToggle");
  const html = document.documentElement;

  if (localStorage.getItem("darkMode") === "true") {
    html.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("input", () => {
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
      localStorage.setItem("darkMode", "true");
    } else {
      localStorage.setItem("darkMode", "false");
    }
  });
}
