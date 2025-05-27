import TaskFilter from './components/FilterTask/filter-task';
import TaskForm from './components/TaskForm/task-form';
import TaskList from './components/TaskList/task-list';
import useTasks from './hooks/use-task';
import useTaskFilter from './hooks/use-task-filter';
import './App.css';

function App() {
  const { tasks, isLoading, addTask, toggleTask, deleteTask } = useTasks();
  const {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredTasks,
    counts,
  } = useTaskFilter(tasks);

  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">To Do List</h1>
          <p className="page-subtitle">Stay on track, every day</p>
        </header>

        <main className="main-content">
          <TaskForm onAddTask={addTask} />

          <TaskFilter
            filter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            counts={counts}
          />

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              searchQuery={searchQuery}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
