# ⚡ Pipeline Builder — VectorShift Technical Assessment

A visual **drag-and-drop pipeline builder** built with **React Flow** on the frontend and **FastAPI** on the backend. Users can create, connect, and analyze node-based pipelines — the backend validates the graph and checks whether it forms a **Directed Acyclic Graph (DAG)**.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup (FastAPI)](#2-backend-setup-fastapi)
  - [3. Frontend Setup (React)](#3-frontend-setup-react)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

- **Drag-and-drop node interface** — 9 node types including Input, Output, LLM, Text, Filter, Merge, API, Conditional, and Note
- **Dynamic Text node** — auto-resizes and generates handles based on `{{variable}}` patterns
- **Reusable BaseNode abstraction** — all nodes extend a shared `BaseNode` component for consistency
- **Pipeline analysis** — submit your pipeline to the backend to get node/edge counts and DAG validation
- **Dark-themed UI** — modern, professional interface with glassmorphism effects and smooth animations
- **MiniMap & Controls** — full React Flow navigation support

---

## 🛠 Tech Stack

| Layer      | Technology                                                   |
| ---------- | ------------------------------------------------------------ |
| Frontend   | React 18, React Flow 11, Zustand (state management)         |
| Backend    | Python, FastAPI, Uvicorn, Pydantic                           |
| Styling    | Vanilla CSS with CSS custom properties (dark theme)          |
| Tooling    | Create React App, npm                                        |

---

## 📁 Project Structure

```
Ayush_Thakur_technical_assessment/
├── backend/
│   └── main.py                 # FastAPI server — pipeline parsing & DAG check
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── nodes/              # Node components
│   │   │   ├── BaseNode.js     # Reusable base node abstraction
│   │   │   ├── BaseNode.css    # Base node styling
│   │   │   ├── inputNode.js    # Input node
│   │   │   ├── outputNode.js   # Output node
│   │   │   ├── llmNode.js      # LLM node
│   │   │   ├── textNode.js     # Text node (dynamic handles)
│   │   │   ├── noteNode.js     # Note node
│   │   │   ├── filterNode.js   # Filter node
│   │   │   ├── mergeNode.js    # Merge node
│   │   │   ├── apiNode.js      # API node
│   │   │   └── conditionalNode.js  # Conditional node
│   │   ├── App.js              # Root component
│   │   ├── ui.js               # React Flow canvas & drop handling
│   │   ├── toolbar.js          # Draggable node toolbar
│   │   ├── draggableNode.js    # Draggable node chip component
│   │   ├── submit.js           # Submit button & results modal
│   │   ├── store.js            # Zustand state management
│   │   ├── index.js            # App entry point
│   │   └── index.css           # Global styles & design system
│   ├── package.json
│   └── .gitignore
└── README.md                   # ← You are here
```

---

## ✅ Prerequisites

Make sure the following are installed on your system before proceeding:

| Tool       | Version  | Download Link                                      |
| ---------- | -------- | -------------------------------------------------- |
| **Node.js** | ≥ 16.x  | [https://nodejs.org/](https://nodejs.org/)         |
| **npm**     | ≥ 8.x   | Comes with Node.js                                 |
| **Python**  | ≥ 3.8   | [https://www.python.org/](https://www.python.org/) |
| **pip**     | latest   | Comes with Python                                  |

> **Verify installation** by running:
> ```bash
> node --version
> npm --version
> python --version   # or python3 --version on macOS/Linux
> pip --version      # or pip3 --version on macOS/Linux
> ```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Ayush_Thakur_technical_assessment.git
cd Ayush_Thakur_technical_assessment
```

---

### 2. Backend Setup (FastAPI)

Open a **terminal** and run the following:

```bash
# Navigate to the backend directory
cd backend

# Install Python dependencies
pip install fastapi uvicorn pydantic
# On macOS/Linux, you may need to use pip3 instead of pip

# Start the backend server
uvicorn main:app --reload --port 8000
```

You should see output like:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Application startup complete.
```

> **✓ Backend is now running at** `http://localhost:8000`
>
> You can verify by opening `http://localhost:8000/` in a browser — you should see `{"Ping": "Pong"}`.

---

### 3. Frontend Setup (React)

Open a **second terminal** (keep the backend running) and run:

```bash
# Navigate to the frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the React development server
npm start
```

You should see:

```
Compiled successfully!

You can now view frontend in the browser.
  Local: http://localhost:3000
```

> **✓ Frontend is now running at** `http://localhost:3000`
>
> The browser should open automatically. If not, navigate to `http://localhost:3000` manually.

---

## 🎮 Usage

1. **Drag nodes** from the toolbar at the top of the screen onto the canvas
2. **Connect nodes** by clicking and dragging from an output handle (right side) to an input handle (left side) of another node
3. **Configure nodes** — use the fields inside each node to set values (e.g., Text nodes support `{{variable}}` syntax to auto-generate handles)
4. **Click "Run Pipeline"** at the bottom to submit your pipeline to the backend
5. **View results** — a modal will display:
   - **Number of Nodes** in the pipeline
   - **Number of Edges** (connections)
   - **Is DAG** — whether the pipeline is a valid Directed Acyclic Graph (no cycles)

---

## 📡 API Reference

### `GET /`

Health check endpoint.

**Response:**
```json
{ "Ping": "Pong" }
```

### `POST /pipelines/parse`

Analyzes the submitted pipeline.

**Request Body:**
```json
{
  "nodes": [
    { "id": "node-1", "type": "customInput", "data": {} },
    { "id": "node-2", "type": "llm", "data": {} }
  ],
  "edges": [
    { "source": "node-1", "target": "node-2" }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

---

## 🔧 Troubleshooting

### Port already in use

If port `3000` or `8000` is already in use:

```bash
# Frontend: change port
# Windows (PowerShell)
$env:PORT=3001; npm start

# macOS/Linux
PORT=3001 npm start

# Backend: change port
uvicorn main:app --reload --port 8001
```

> ⚠️ If you change the backend port, update the fetch URL in `frontend/src/submit.js` accordingly.

### CORS errors in browser console

The backend is configured to allow requests from `http://localhost:3000`. If you run the frontend on a different port, update the `allow_origins` list in `backend/main.py`:

```python
allow_origins=["http://localhost:3000", "http://localhost:3001"],
```

### `npm install` fails

- Delete `node_modules` and `package-lock.json`, then try again:
  ```bash
  cd frontend
  rm -rf node_modules package-lock.json   # macOS/Linux
  # or on Windows PowerShell:
  Remove-Item -Recurse -Force node_modules, package-lock.json

  npm install
  ```

### Python module not found

- Make sure you're using the correct Python version:
  ```bash
  python3 -m pip install fastapi uvicorn pydantic
  ```
- Consider using a virtual environment:
  ```bash
  python -m venv venv
  # Windows:
  .\venv\Scripts\activate
  # macOS/Linux:
  source venv/bin/activate

  pip install fastapi uvicorn pydantic
  ```

---

## 📝 Notes

- The frontend runs on **port 3000** and the backend runs on **port 8000** by default
- Both servers need to be running simultaneously for the full application to work
- The backend uses **Kahn's algorithm** for DAG (cycle) detection via topological sort
- Hot reload is enabled on both servers — changes to source files will auto-refresh

---

> **Built by Ayush Thakur** — VectorShift Frontend Technical Assessment
