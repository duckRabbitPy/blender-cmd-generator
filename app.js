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
const selectAnimation = document.querySelector("#render_animation");
const wholeInput = document.querySelector("#whole_animation");
const singleInput = document.querySelector("#single_frame");
const frameInput = document.querySelector("#frame_number");
const saveBtn = document.querySelector("#save");
const blenderPathInput = document.querySelector("#blender_path");
const copyAlert = document.querySelector("#alert");
const output = document.querySelector("#output");

getStoredState();

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userArgs = getUserArgs();

  if (userArgs.animation === "-f" && userArgs.frames === "") {
    alert("must specify frame number");
    return;
  }

  if (userArgs.filePath === "C:\\") {
    alert("please enter valid path to blender file");
    return;
  }

  if (output.innerHTML === "") {
    output.innerHTML = concatCMD(userArgs, "full");
    navigator.clipboard.writeText(output.innerHTML);
  } else {
    output.innerHTML += concatCMD(userArgs, "partial");
    navigator.clipboard.writeText(output.innerHTML);
  }

  copyAlert.classList.remove("hidden");

  setTimeout(() => {
    copyAlert.classList.add("hidden");
  }, 1000);

  submitBtn.innerHTML = "Add to batch";
});

function getUserArgs() {
  formData = new FormData(userForm);

  const userArgs = {
    blenderDir: `cd '${formData.get("blender-path")}'`,
    filePath: formData.get("file-path"),
    blender: "./blender",
    engine: formData.get("render-engine"),
    print: formData.get("print-stats") ? "-- --cycles-print-stats" : null,
    start: `-s ${formData.get("start-frame")}`,
    end: `-e ${formData.get("end-frame")}`,
    frames: formData.get("frames"),
    animation: formData.get("animation"),
  };

  return userArgs;
}

function concatCMD(userArgs, mode) {
  const part1 = `${userArgs.blenderDir}\n${userArgs.blender} -b`;
  const part2 = ` '${userArgs.filePath}' ${userArgs.engine} ${validateStartEnd(
    userArgs.start
  )} ${validateStartEnd(userArgs.end)} ${userArgs.animation} ${validateFrames(
    userArgs.frames,
    userArgs.animation
  )} ${validatePrint(userArgs.print)}`.replace(/\s\s+/g, " ");

  return mode === "full" ? part1 + part2 : part2;
}

function validateStartEnd(arg) {
  return arg.length > 3 ? arg : "";
}

function validateFrames(frameNum, animation) {
  return frameNum && animation === "-f" ? frameNum : "";
}

function validatePrint(arg) {
  return arg ? arg : "";
}

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

selectAnimation.addEventListener("click", () => {
  frameInput.value = "";
});

wholeInput.addEventListener("click", () => {
  startInput.value = "";
  endInput.value = "";
  frameInput.value = "";
});

singleInput.addEventListener("click", () => {
  startInput.value = "";
  endInput.value = "";
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let presetPath = blenderPathInput.value;
  storePreset(presetPath);
  alert("path saved for future browser sessions");
});
