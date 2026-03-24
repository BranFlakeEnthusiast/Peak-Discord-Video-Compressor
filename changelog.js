// ════════════════════════════════════════
// PEAK — Video Compressor  |  changelog.js
// ════════════════════════════════════════

const CHANGELOG = [
  {
    version: "v1.5",
    date: "2026-03-24",
    latest: true,
    changes: [
      "Fixed video preview not working when files are dragged into the app",
      "Added rename button for compressed videos — reflected in the green output link",
      "Queue thumbnails now have a minimum height for consistent layout",
      "Queue tray overflow now scrolls properly",
      "Moved changelog data to external changelog.js for readability",
    ],
  },
  {
    version: "v1.4",
    date: "2026-03-23",
    changes: [
      "Fixed video preview never playing in the trim modal (added local HTTP server with byte-range support)",
      "Fixed CMD/terminal window flashing when opening the trim modal (missing CREATE_NO_WINDOW flag on ffprobe)",
      "Fixed duration displaying 0:00 to -1:-1 before video metadata loads",
      "Fixed Set In / Set Out row clipping outside the modal — inputs and buttons now use a 2-column grid",
      "Fixed GPU tooltip clipping off the left edge of a narrow window",
      "Queue items now have a minimum width and the list is horizontally scrollable",
      "Responsive layout: vertical when narrow, horizontal (upload left / settings right) when the window is wide",
      "Broke index.html into separate style.css and app.js files",
      "Added this changelog",
    ],
  },
  {
    version: "v1.3",
    date: "2026-03-22",
    changes: [
      "Added trim modal with embedded video preview and scrubber",
      "Audio track selection per file (enable / disable individual tracks)",
      "Timeline in/out handle drag for precise trimming",
      "Volume control in transport bar",
      "Trim badge shown on queue item when trim is active",
    ],
  },
  {
    version: "v1.2",
    date: "2026-03-21",
    changes: [
      "Custom output folder support",
      "GPU encoding toggle (NVIDIA NVENC)",
      "Audio track merge toggle for multi-track source files",
      "Output format dropdown: MP4, MKV, MOV, WebM (VP9)",
      "Two-pass encoding mode for more accurate file size",
    ],
  },
  {
    version: "v1.1",
    date: "2026-03-20",
    changes: [
      "Batch queue — add multiple files and compress sequentially",
      "Thumbnail previews fetched from first frame of each file",
      "Per-item progress bar with live ETA",
      "Click compressed filename to open it in Explorer",
    ],
  },
  {
    version: "v1.0",
    date: "2026-03-19",
    changes: [
      "Initial release",
      "Drag-and-drop or file-browse to add videos",
      "Target size and audio bitrate sliders",
      "FFmpeg presence check on startup",
    ],
  },
];
