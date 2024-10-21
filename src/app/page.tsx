"use client"
import {useState } from "react";
import { NewTodoForm } from "./_components/new-todo-form";

// Define the structure of a single to-do item
type ToDoItemProps = {
  title: string;
  description: string;
  completed: boolean;
  onCompleteChanged: (newValue: boolean) => void;
  onRemove: () => void;
}

// Main component for the Home page
export default function Home() {
  // State to hold the list of to-do items
  const [todos, setTodos] = useState<ToDoItem[]>([
    { title: "Example", description: "This is an example", completed: false }
  ]);

  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">To-Do List</h1>
      <ul className="space-y-2">
        {/* Map over the todos array to render each to-do item */}
        {todos.map((todo, index) => (
          <ToDoItem 
            key={index}
            title={todo.title} 
            description={todo.description} 
            completed={todo.completed}
            onCompleteChanged={(newValue: boolean) => {
              const newTodos = [...todos];
              newTodos[index].completed = newValue;
              setTodos(newTodos);
            }}
            onRemove={() => {
              setTodos(todos.filter((_, i) => i !== index));
            }}
          />
        ))}
      </ul>
      <NewTodoForm onCreate={({title, description}) => {
        setTodos(prev => {
          const newTodos = [...prev];
          newTodos.push({title, description, completed: false});
          return newTodos;
        });
      }} 
      onRemove={()=>{
        const newTodos = [...prev].filter((_, i) => i !== index);
        return newTodos;
      }}
      />
    </div>
  );
}

// Corrected ToDoItem component
function ToDoItem({ title, description, completed, onCompleteChanged, onRemove }: ToDoItemProps) {
  return (
    <li className="w-full flex gap-2 items-center border rounded p-2">
      {/* Checkbox to toggle the completion status of a to-do */}
      <input 
        type="checkbox" 
        checked={completed} 
        onChange={e => onCompleteChanged(e.target.checked)}
      />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="ml-auto">
        <button type="button" className="text-red-500" onClick={onRemove}>
          Remove
        </button>
      </div>
    </li>
  );
}
