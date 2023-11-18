const formEl = document.querySelector("form");
const colorsEl = document.querySelector("#colors");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);

  const color = formData.get("color");
  const mode = formData.get("mode");

  console.log(color, mode);

  const schemes = await fetchSchemes(color.substring(1), mode);
});

function fetchSchemes(color, mode) {
  return fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`
  ).then((res) => res.json());
}
