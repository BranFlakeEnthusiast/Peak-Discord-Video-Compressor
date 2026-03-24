// ════════════════════════════════════════
// PEAK — Video Compressor  |  queue.js
// ════════════════════════════════════════
// Queue management, file browsing, and drag-drop.

// ── File browsing / drag-drop ─────────────────────────────────────
async function browseFiles() {
  if (isRunning) return;
  const paths = await pywebview.api.open_file_dialog();
  for (const p of paths) addToQueue(p);
}

const dz = document.getElementById("dropZone");
dz.addEventListener("dragover", (e) => {
  e.preventDefault();
  dz.classList.add("hover");
});
dz.addEventListener("dragleave", () => dz.classList.remove("hover"));
dz.addEventListener("drop", async (e) => {
  e.preventDefault();
  dz.classList.remove("hover");
  if (isRunning) return;
  const files = Array.from(e.dataTransfer.files);
  for (const f of files) {
    // f.path is available in some webview/Electron environments;
    // fall back to pywebview API to resolve the full path from the filename.
    let fullPath = f.path;
    if (!fullPath || fullPath === f.name) {
      try {
        fullPath = await pywebview.api.resolve_dropped_path(f.name);
      } catch (_) {
        fullPath = f.name;
      }
    }
    if (fullPath) addToQueue(fullPath);
  }
});

// ── Queue management ──────────────────────────────────────────────
function addToQueue(path) {
  const id = `qi-${++idCounter}`;
  const name = path.split(/[/\\]/).pop();
  queue.push({
    id,
    path,
    name,
    status: "waiting",
    trimStart: "",
    trimEnd: "",
    enabledTracks: null,
    audioTracks: [],
  });
  renderQueueItem(id, name, path);
  updateCompressBtn();

  pywebview.api.get_thumbnail(path).then((uri) => {
    const t = document.querySelector(`#${id} .qi-thumb`);
    if (t)
      t.innerHTML = uri ? `<img src="${uri}" alt="" />` : thumbPlaceholder();
  });
}

function removeFromQueue(id) {
  queue = queue.filter((i) => i.id !== id);
  document.getElementById(id)?.remove();
  updateQueueEmpty();
  updateCompressBtn();
}

function updateQueueEmpty() {
  document.getElementById("queueEmpty").style.display =
    queue.length === 0 ? "flex" : "none";
}

function updateCompressBtn() {
  const waiting = queue.filter((i) => i.status === "waiting").length;
  const btn = document.getElementById("compressBtn");
  const label = document.getElementById("compressBtnLabel");
  updateQueueEmpty();
  if (isRunning) {
    btn.disabled = true;
    label.textContent = "Compressing…";
    return;
  }
  btn.disabled = waiting === 0;
  label.textContent =
    waiting === 1
      ? "Compress 1 file"
      : waiting > 1
        ? `Compress ${waiting} files`
        : "Compress";
}

function renderQueueItem(id, name, path) {
  const wrap = document.getElementById("queueWrap");
  const empty = document.getElementById("queueEmpty");
  const el = document.createElement("div");
  el.className = "qi";
  el.id = id;
  el.innerHTML = `
    <div class="qi-main">
      <div class="qi-thumb"><div class="thumb-spinner"></div></div>
      <div class="qi-body">
        <button class="qi-name qi-name-link" title="Reveal in explorer" onclick="revealSourceFile('${esc(path)}')">${esc(name)}</button>
        <div class="qi-status-row" id="${id}-status">
          <span class="chip chip-waiting">Waiting</span>
        </div>
      </div>
      <div class="qi-actions">
        <button class="qi-btn trim-btn" id="${id}-trimbtn" onclick="openTrimModal('${id}')" title="Trim / preview">✂</button>
        <button class="qi-btn remove" onclick="removeFromQueue('${id}')" title="Remove">✕</button>
      </div>
    </div>`;
  wrap.insertBefore(el, empty);
  empty.style.display = "none";
}
