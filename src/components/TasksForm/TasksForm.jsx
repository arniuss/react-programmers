import "./TasksForm.css"

function TasksForm({ valid, onChange, onAdd }) {
    const buttonClass = !valid ? "invalid" : "valid";

  return (
    <div className="tasks-container">
      <h2>Your tasks</h2>
      <div className="tasks-form">
        <label htmlFor="lines">Lines of code: </label>
        <input
          type="number"
          placeholder="Lines of code"
          name="lines"
          onChange={onChange}
        />
        <label htmlFor="days">Days to complete: </label>
        <input
          type="number"
          placeholder="Time limit [days]"
          name="days"
          onChange={onChange}
        />
        <button className={buttonClass} disabled={!valid} onClick={onAdd}>
          Do it
        </button>
      </div>
    </div>
  )
}
export default TasksForm
