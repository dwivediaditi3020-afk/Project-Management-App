import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://project-management-app-production-3c12.up.railway.app";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [taskTitle, setTaskTitle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get(`${BASE_URL}/api/tasks`, {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  const fetchProjects = async () => {
    const res = await axios.get(`${BASE_URL}/api/projects`, {
      headers: { Authorization: token }
    });
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${BASE_URL}/api/auth/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const createTask = async () => {
    await axios.post(
      `${BASE_URL}/api/tasks`,
      { title: taskTitle, assignedTo: selectedUser },
      { headers: { Authorization: token } }
    );
    setTaskTitle("");
    setSelectedUser("");
    fetchTasks();
  };

  const createProject = async () => {
    await axios.post(
      `${BASE_URL}/api/projects`,
      { name: projectName },
      { headers: { Authorization: token } }
    );
    setProjectName("");
    fetchProjects();
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `${BASE_URL}/api/tasks/${id}`,
      { status },
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await axios.delete(`${BASE_URL}/api/tasks/${id}`, {
      headers: { Authorization: token }
    });
    fetchTasks();
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete project?")) return;
    await axios.delete(`${BASE_URL}/api/projects/${id}`, {
      headers: { Authorization: token }
    });
    fetchProjects();
  };

  return (
    <div style={{ padding: "20px", color: "white", background: "#0f172a" }}>
      <h2>Dashboard</h2>

      <h3>Create Project</h3>
      <input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      <button onClick={createProject}>Add</button>

      <h3>Projects</h3>
      {projects.map(p => (
        <div key={p._id}>
          {p.name}
          <button onClick={() => deleteProject(p._id)}>Delete</button>
        </div>
      ))}

      <h3>Create Task</h3>
      <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />

      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option>Assign User</option>
        {users.map(u => (
          <option key={u._id} value={u._id}>{u.name}</option>
        ))}
      </select>

      <button onClick={createTask}>Add Task</button>

      <h3>Tasks</h3>
      {tasks.map(task => (
        <div key={task._id}>
          <h4>{task.title}</h4>
          <p>{task.assignedTo?.name}</p>

          <select onChange={(e) => updateStatus(task._id, e.target.value)}>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;