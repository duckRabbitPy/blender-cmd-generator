const userForm = document.querySelector("#blender_inputs");
const copyBtn = document.querySelector("#copy");
const clearBtn = document.querySelector("#clear");
const eevee = document.querySelector("#eevee");
const cycles = document.querySelector("#cycles");
const submitBtn = document.querySelector("#submit_btn");
const printLabel = document.querySelector("#print_label");
const printOption = document.querySelector("#print");
const startInput = document.querySelector("#start_frame");
const endInput = document.querySelector("#end_frame");
const wholeInput = document.querySelector("#whole_animation");
const singleInput = document.querySelector("#single_frame");
const saveBtn = document.querySelector("#save");
const blenderPathInput = document.querySelector("#blender_path");

getStoredState();

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  formData = new FormData(userForm);

  let userArgs = {
    blenderDir: formData.get("blender-path"),
    fileDir: getPath(formData.get("file-path")),
    fileName: getFileName(formData.get("file-path")),
    blender: formData.get("run-blender"),
    engineArg: formData.get("render-engine"),
    printArg: formData.get("print-stats") ? "--cycles-print-stats" : null,
    startArg: formData.get("start-frame"),
    endArg: formData.get("end-frame"),
    frameNumArg: formData.get("frames"),
    animationArg: formData.get("animation"),
  };

  if (userArgs.animationArg === "-f" && userArgs.frameNumArg === "") {
    alert("must specify frame number");
    return;
  }

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
    }, 1000);
  }, 100);

  submitBtn.innerHTML = "Add to batch";
});

function fullConcatCMD(userArgs) {
  return `${userArgs.blenderDir}\n${userArgs.blender} -b ${userArgs.fileDir}${
    userArgs.fileName
  } ${userArgs.engineArg} ${userArgs.startArg ? userArgs.startArg : ""} ${
    userArgs.endArg ? userArgs.endArg : ""
  } ${userArgs.animationArg} ${
    userArgs.frameNumArg && userArgs.animationArg === "-f"
      ? userArgs.frameNumArg
      : ""
  } ${userArgs.printArg ? userArgs.printArg : ""}`.replace(/\s\s+/g, " ");
}

function shortConcatCMD(userArgs) {
  return `${userArgs.fileDir}${userArgs.fileName} ${userArgs.engineArg} ${
    userArgs.startArg ? userArgs.startArg : ""
  } ${userArgs.endArg ? userArgs.endArg : ""} ${userArgs.animationArg} ${
    userArgs.frameNumArg && userArgs.animationArg === "-f"
      ? userArgs.frameNumArg
      : ""
  } ${userArgs.printArg ? userArgs.printArg : ""}`.replace(/\s\s+/g, " ");
}

function getFileName(path) {
  const lastSeperatorPos = path.lastIndexOf("\\");
  return `'${path.slice(lastSeperatorPos + 1, path.length)}'`;
}

function getPath(path) {
  const lastSeperatorPos = path.lastIndexOf("\\");
  return path.slice(0, lastSeperatorPos + 1);
}

clearBtn.addEventListener("click", () => {
  const output = document.querySelector("#output");
  output.innerHTML = "";
  submitBtn.innerHTML = "Generate new command";
});

eevee.addEventListener("click", (event) => {
  if (event.target.checked) {
    printOption.classList.add("hidden");
    printLabel.classList.add("hidden");
    printOption.checked = null;
  }
});

cycles.addEventListener("click", (event) => {
  if (event.target.checked) {
    printLabel.classList.remove("hidden");
    printOption.classList.remove("hidden");
  }
});

wholeInput.addEventListener("click", () => {
  startInput.value = "";
  endInput.value = "";
});

singleInput.addEventListener("click", () => {
  startInput.value = "";
  endInput.value = "";
});

saveBtn.addEventListener("click", () => {
  let presetPath = blenderPathInput.value;
  storePreset(presetPath);
  alert("path saved for future browser sessions");
});

function getStoredState() {
  let storedPreset = window.localStorage.getItem("presetPath");
  if (storedPreset !== null) {
    let preset = JSON.parse(storedPreset);
    blenderPathInput.value = preset;
  }
}

function storePreset(preset) {
  window.localStorage.setItem("presetPath", JSON.stringify(preset));
}
