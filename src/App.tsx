import Notes from './components/notes'
import Watches from './components/watches'

function App() {
  return (
    <div className="flex flex-col justify-center align-center w-screen">
      <Watches />
      <Notes />
    </div>
  )
}

export default App
