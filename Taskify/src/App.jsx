import React, { useState, useEffect} from 'react'
import Navbar from './components/Navbar'

function App() {

  // const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

const [todos, setTodos] = useState(() => {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
});

 useEffect(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    setTodos(JSON.parse(storedTodos));
  }
}, []);

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    
  }

  const handleEdit = (id) => {
    const t = todos.find(i => i.id === id);
    if (!t) return;
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    
  }
  
  const handleAdd = () => {
    if (!todo || !todo.trim()) return;
    const newTodo = { id: Date.now(), todo: todo.trim(), isCompleted: false };
    setTodos([...todos, newTodo]);
    setTodo("");
    
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    const id = Number(e.target.name);
    const newTodos = todos.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item);
    setTodos(newTodos);
    
  }

  // keep localStorage in sync whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save todos to localStorage', e);
    }
  }, [todos]);
  return (
    <>
      <Navbar />
      <div className='container mx-auto min-h-screen flex flex-col items-center pt-6'>
        <h1 className='font-bold text-center text-3xl mb-4'>Planit - Manage your todos at one place</h1>
        <div id ='box'className='bg-violet-100 p-6 m-6 rounded-xl mx-auto w-full max-w-2xl'>
          <div className="addTodo my-5 flex flex-col gap-4 text-center">
            <h2 className='text-xl font-bold '>Add a Todo</h2>
            <div className='flex text-center gap-3 justify-center'>

              <input onChange={handleChange} value={todo} className='border-black bg-white rounded-xl w-3/5 text-center border-none font-bold' type="text" />
              <button onClick={handleAdd} className='bg-violet-700 cursor-pointer hover:bg-violet-900 text-white p-2 py-1 rounded-xl align-middle'>Save</button>
            </div>
          </div>
          <h2 className='text-xl font-bold my-5'>Your Todos</h2>
          <div className="todos flex flex-col items-center gap-4">
            {todos.length === 0 && <div className='py-12 text-center'>No todos available. Please add some todos.</div>}
            {todos.map(item => {
              return <div className="todo flex justify-between items-center w-full bg-white p-3 rounded-lg" key={item.id}>
                <div className='flex items-center gap-5'>
                  <input type="checkbox" name={item.id} checked={!!item.isCompleted} onChange={handleCheckbox} />
                  <div className={`text font-bold ${item.isCompleted ? 'line-through text-gray-500' : ''}`}>{item.todo}</div>
                </div>
                <div className="buttons">
                  <button onClick={() => handleEdit(item.id)} className='bg-violet-700 cursor-pointer hover:bg-violet-900 text-white p-2 py-1 rounded-xl mx-2 align-middle'><span class="material-symbols-outlined">
edit
</span></button>
                  <button onClick={() => handleDelete(item.id)} className='bg-violet-700 cursor-pointer hover:bg-violet-900 text-white p-2 py-1 rounded-xl mx-2 align-middle'><span class="material-symbols-outlined">
delete
</span></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
