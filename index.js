const formEl = document.querySelector("form");
const colorsEl = document.querySelector("#colors");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);

  const color = formData.get("color");
  const mode = formData.get("mode");

  const schemes = await fetchSchemes(color.substring(1), mode);

  colorsEl.innerHTML = schemes.colors.reduce((acc, current) => {
    const hexValue = current.hex.value;
    return (
      acc +
      `
      <li>
        <div style="background-color: ${hexValue}" data-color="${hexValue}"></div>
        <p data-color="${hexValue}">${hexValue}</p>
      </li>`
    );
  }, "");
});

colorsEl.addEventListener("click", (event) =>
  navigator.clipboard.writeText(event.target.dataset.color)
);

function fetchSchemes(color, mode) {
  return fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`
  ).then((res) => res.json());
}
