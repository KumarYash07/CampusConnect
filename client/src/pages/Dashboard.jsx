import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../services/userService";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [taskData, setTaskData] =
    useState({
      title: "",
      description: "",
    });

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchUsers();
    fetchTasks();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response =
        await getUsers();

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response =
        await getTasks();

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await createTask(taskData);

      setMessage(
        "Task Created Successfully"
      );

      setTaskData({
        title: "",
        description: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
      setMessage(
        "Failed to create task"
      );
    }
  };

  const handleComplete =
    async (id) => {
      try {
        await updateTask(id, {
          status:
            "Completed",
        });

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id) => {
      try {
        await deleteTask(id);

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  const filteredUsers =
    users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const filteredTasks =
    tasks.filter(
      (task) =>
        statusFilter ===
          "All" ||
        task.status ===
          statusFilter
    );

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;

  return (
    <div className="container">
      <h1>
        CampusConnect Dashboard
      </h1>

      <button
        onClick={handleLogout}
      >
        Logout
      </button>

      <hr />

      <h2>
        Dashboard Summary
      </h2>

      <p>
        Total Tasks: {totalTasks}
      </p>

      <p>
        Completed Tasks:
        {" "}
        {completedTasks}
      </p>

      <p>
        Pending Tasks:
        {" "}
        {pendingTasks}
      </p>

      <hr />

      <h2>
        Search Students
      </h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <h2>
        Registered Students
      </h2>

      {filteredUsers.length ===
      0 ? (
        <p>
          No matching students
          found
        </p>
      ) : (
        filteredUsers.map(
          (user) => (
            <div
              key={user._id}
              className="announcement-card"
            >
              <h3>
                {user.name}
              </h3>

              <p>
                {user.email}
              </p>

              <p>
                Registered:
                {" "}
                {new Date(
                  user.registrationDate
                ).toLocaleDateString()}
              </p>
            </div>
          )
        )
      )}

      <hr />

      <h2>Create Task</h2>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={
            taskData.title
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={
            taskData.description
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Add Task
        </button>
      </form>

      {message && (
        <p>{message}</p>
      )}

      <hr />

      <h2>
        Filter Tasks
      </h2>

      <select
        value={
          statusFilter
        }
        onChange={(e) =>
          setStatusFilter(
            e.target.value
          )
        }
      >
        <option value="All">
          All
        </option>

        <option value="Pending">
          Pending
        </option>

        <option value="Completed">
          Completed
        </option>
      </select>

      <br />
      <br />

      <h2>Tasks</h2>

      {filteredTasks.length ===
      0 ? (
        <p>
          No tasks found for
          selected filter
        </p>
      ) : (
        filteredTasks.map(
          (task) => (
            <div
              key={task._id}
              className="announcement-card"
            >
              <h3>
                {task.title}
              </h3>

              <p>
                {
                  task.description
                }
              </p>

              <p>
                Status:
                {" "}
                {task.status}
              </p>

              <button
                disabled={
                  task.status ===
                  "Completed"
                }
                onClick={() =>
                  handleComplete(
                    task._id
                  )
                }
              >
                Complete
              </button>

              {" "}

              <button
                onClick={() =>
                  handleDelete(
                    task._id
                  )
                }
              >
                Delete
              </button>
            </div>
          )
        )
      )}
    </div>
  );
};

export default Dashboard;