// ════════════════════════════════════════
// PEAK — Video Compressor  |  settings.js
// ════════════════════════════════════════
// Toggle controls, output directory, and format dropdown.

// ── Toggles ───────────────────────────────────────────────────────
function toggleCb(id) {
  document.getElementById(id).checked = !document.getElementById(id).checked;
}

let _outputDirToggling = false;
function toggleOutputDir() {
  if (_outputDirToggling) return;
  _outputDirToggling = true;
  setTimeout(() => {
    _outputDirToggling = false;
  }, 50);
  const cb = document.getElementById("outputDirToggle");
  cb.checked = !cb.checked;
  document
    .getElementById("outputDirPicker")
    .classList.toggle("visible", cb.checked);
  document.getElementById("outputDirSubtitle").textContent = cb.checked
    ? customOutDir
      ? shortPath(customOutDir)
      : "Select a folder below"
    : "Off — saves next to source file";
}

async function pickDirectory() {
  const dir = await pywebview.api.pick_directory();
  if (dir) {
    customOutDir = dir;
    document.getElementById("dirPathLabel").textContent = dir;
    document.getElementById("dirPathLabel").classList.add("set");
    document.getElementById("outputDirSubtitle").textContent = shortPath(dir);
  }
}

// ── Format dropdown ───────────────────────────────────────────────
function toggleFmtMenu(e) {
  e.stopPropagation();
  const btn = document.getElementById("fmtBtn");
  const menu = document.getElementById("fmtMenu");
  const open = menu.classList.toggle("open");
  btn.classList.toggle("open", open);
}

function selectFmt(el) {
  currentFormat = el.dataset.value;
  document
    .querySelectorAll(".fmt-option")
    .forEach((o) => o.classList.remove("selected"));
  el.classList.add("selected");
  document.getElementById("fmtBtnLabel").textContent =
    currentFormat === "original" ? "Original" : currentFormat.toUpperCase();
  document.getElementById("fmtMenu").classList.remove("open");
  document.getElementById("fmtBtn").classList.remove("open");
}

document.addEventListener("click", () => {
  document.getElementById("fmtMenu")?.classList.remove("open");
  document.getElementById("fmtBtn")?.classList.remove("open");
});
