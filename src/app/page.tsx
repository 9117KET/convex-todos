"use client"
import {useState } from "react";
import { NewTodoForm } from "./_components/new-todo-form";

// Define the structure of a single to-do item
type ToDoItemProps = {
  title: string;
  description: string;
  completed: boolean;
  onCompleteChanged: (newValue: boolean) => void;
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
            key={index} // Moved the key here
            title={todo.title} 
            description={todo.description} 
            completed={todo.completed}
            onCompleteChanged={(newValue: boolean) => { // Explicitly define the type for newValue
              const newTodos = [...todos];
              newTodos[index].completed = newValue;
              setTodos(newTodos);
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
      }} />
    </div>
  );
}

// Corrected ToDoItem component
function ToDoItem({ title, description, completed, onCompleteChanged }: ToDoItemProps) {
  return (
    <li className="flex fap-2 border rounded p-2">
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
    </li>
  );
}