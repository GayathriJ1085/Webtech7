import React, { useState, useEffect } from "react";

/*
 LabTracker:
 - Add steps/tasks, toggle done, remove
 - Persists data to localStorage ("exp7_lab_tasks")
 - Demonstrates useEffect for state persistence
*/

const STORAGE_KEY = "exp7_lab_tasks";

export default function LabTracker() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  // Load from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setList(JSON.parse(saved));
      } catch {
        setList([]);
      }
    }
  }, []);

  // Save to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  // Add new task
  const add = () => {
    if (task.trim() === "") return;
    setList((prev) => [
      ...prev,
      { id: Date.now(), text: task.trim(), done: false },
    ]);
    setTask("");
  };

  // Toggle completion
  const toggle = (id) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  // Remove task
  const remove = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="card card-theme question-box">
      <h5>Lab Task Tracker</h5>
      <p className="small-muted">
        Add experiment steps and mark them done. Tasks are saved in localStorage
        so they persist after refresh.
      </p>

      <div className="row g-2">
        <div className="col-md-9">
          <input
            className="form-control form-control-theme"
            placeholder="New lab step (e.g., 'Upload firmware')"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-gold w-100" type="button" onClick={add}>
            Add Step
          </button>
        </div>
      </div>

      <ul className="list-group list-group-flush mt-3">
        {list.length === 0 && (
          <li className="small-muted">No steps added.</li>
        )}
        {list.map((item) => (
          <li
            key={item.id}
            className="list-group-item card-theme d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
                style={{ marginRight: 8 }}
              />
              <span
                style={{
                  textDecoration: item.done ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>
            </div>
            <button
              className="btn btn-silver btn-sm"
              onClick={() => remove(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
