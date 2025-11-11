import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Vite + React + Tailwind
          </div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
            ¡Hola Mundo!
          </h1>
          <p className="mt-2 text-gray-500">
            Tu proyecto frontend está listo con React, Vite y Tailwind CSS.
          </p>
          <div className="mt-4">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Contador: {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
