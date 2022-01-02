const userForm = document.querySelector("#blender_inputs");
const copyBtn = document.querySelector("#copy");
const clearBtn = document.querySelector("#clear");

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  formData = new FormData(userForm);

  let userArgs = {
    blenderDir: formData.get("blender-path"),
    fileDir: formData.get("file-dir"),
    fileName: formData.get("file-name") + ".blend",
    blender: formData.get("run-blender"),
    renderArg: formData.get("UI-rendering"),
    engineArg: formData.get("render-engine"),
    startArg: formData.get("start-frame"),
    endArg: formData.get("end-frame"),
    animationArg: formData.get("animation"),
  };

  if (userArgs.startArg) {
    userArgs.startArg = "-s" + " " + userArgs.startArg;
  }

  if (userArgs.endArg) {
    userArgs.endArg = "-e" + " " + userArgs.endArg;
  }

  let response = fullConcatCMD(userArgs);
  let shortResponse = shortConcatCMD(userArgs);

  const output = document.querySelector("#output");
  if (output.innerHTML === "") {
    output.innerHTML = response;
    navigator.clipboard.writeText(response);
  } else {
    output.innerHTML += " " + shortResponse;
    navigator.clipboard.writeText(output.innerHTML);
  }
  setTimeout(() => {
    document.querySelector("#alert").classList.remove("hidden");
    setTimeout(() => {
      document.querySelector("#alert").classList.add("hidden");
    }, 800);
  }, 100);
});

clearBtn.addEventListener("click", () => {
  const output = document.querySelector("#output");
  output.innerHTML = "";
});

function fullConcatCMD(userArgs) {
  return `${userArgs.blenderDir}&#13;${userArgs.blender} ${
    userArgs.renderArg
  } ${userArgs.fileDir}'${userArgs.fileName}' ${userArgs.engineArg} ${
    userArgs.startArg ? userArgs.startArg : ""
  } ${userArgs.endArg ? userArgs.endArg : ""} ${userArgs.animationArg}`.replace(
    /\s\s+/g,
    " "
  );
}

function shortConcatCMD(userArgs) {
  return `${userArgs.fileDir} ${userArgs.engineArg} ${
    userArgs.startArg ? userArgs.startArg : ""
  } ${userArgs.endArg ? userArgs.endArg : ""} ${userArgs.animationArg}`.replace(
    /\s\s+/g,
    " "
  );
}
