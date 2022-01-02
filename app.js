const userForm = document.querySelector("#blender_inputs");
const copyBtn = document.querySelector("#copy");

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(userForm);
  let filePath = formData.get("file-path");
  let blenderDir = formData.get("install-dir");
  let renderArg = formData.get("UI-rendering");
  let engineArg = formData.get("render-engine");
  let startArg = formData.get("start-frame");
  if (startArg) {
    startArg = "-s" + " " + startArg;
  }
  let endArg = formData.get("end-frame");
  if (endArg) {
    endArg = "-e" + " " + endArg;
  }
  let animationArg = formData.get("animation");

  let response = `${blenderDir} ${renderArg} ${filePath} ${engineArg} ${startArg} ${endArg} ${animationArg}`;
  let shortResponse = `${filePath} ${engineArg} ${startArg} ${endArg} ${animationArg}`;
  formattedResponse = response.replace(/\s\s+/g, " ");
  formattedShortResponse = shortResponse.replace(/\s\s+/g, " ");

  const output = document.querySelector("#output");
  if (output.innerHTML === "") {
    output.innerHTML = formattedResponse;
    navigator.clipboard.writeText(formattedResponse);
  } else {
    output.innerHTML += " " + formattedShortResponse;
    navigator.clipboard.writeText(output.innerHTML);
  }
  setTimeout(() => {
    document.querySelector("#alert").classList.remove("hidden");
    setTimeout(() => {
      document.querySelector("#alert").classList.add("hidden");
    }, 800);
  }, 100);
});
