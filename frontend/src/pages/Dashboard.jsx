import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [taskTitle, setTaskTitle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Fetch Data
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects", {
      headers: { Authorization: token }
    });
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  // 🔹 Create Task
  const createTask = async () => {
    if (!taskTitle) return alert("Enter task title");

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title: taskTitle, assignedTo: selectedUser },
      { headers: { Authorization: token } }
    );

    setTaskTitle("");
    setSelectedUser("");
    fetchTasks();
  };

  // 🔹 Create Project
  const createProject = async () => {
    try {
      if (!projectName) return alert("Enter project name");

      await axios.post(
        "http://localhost:5000/api/projects",
        { name: projectName },
        { headers: { Authorization: token } }
      );

      setProjectName("");
      fetchProjects();
    } catch {
      alert("Only Admin can create project");
    }
  };

  // 🔹 Update Task Status
  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { status },
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  // 🔹 Delete Task
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: token }
    });

    fetchTasks();
  };

  // 🔹 Delete Project
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await axios.delete(`http://localhost:5000/api/projects/${id}`, {
      headers: { Authorization: token }
    });

    fetchProjects();
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        padding: "30px",
        color: "#e2e8f0",
        fontFamily: "Arial"
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>📊 Dashboard</h2>
        <button
          onClick={logout}
          style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 10px" }}
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div style={{ margin: "15px 0" }}>
        🟥 Todo: {tasks.filter(t => t.status === "Todo").length} | 🟨 In Progress: {tasks.filter(t => t.status === "In Progress").length} | 🟩 Done: {tasks.filter(t => t.status === "Done").length}
      </div>

      {/* Create Project */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Create Project</h3>
        <input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <button onClick={createProject}>Add</button>
      </div>

      {/* Projects */}
      <h3>Projects</h3>
      {projects.map(p => (
        <div key={p._id} style={{ margin: "5px 0" }}>
          {p.name}
          <button onClick={() => deleteProject(p._id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      ))}

      <hr />

      {/* Create Task */}
      <div>
        <h3>Create Task</h3>
        <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />

        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Assign User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        <button onClick={createTask}>Add Task</button>
      </div>

      <hr />

      {/* Tasks */}
      <h3>Tasks</h3>
      {tasks.map(task => (
        <div key={task._id} style={{ border: "1px solid #444", margin: "10px 0", padding: "10px" }}>
          <h4>{task.title}</h4>
          <p>👤 {task.assignedTo?.name || "Unassigned"}</p>

          <select
            value={task.status}
            onChange={(e) => updateStatus(task._id, e.target.value)}
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button onClick={() => deleteTask(task._id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;