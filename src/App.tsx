import Chat from './components/chat'
import Notes from './components/notes'
import Watches from './components/watches'

function App() {
  return (
    <div className="flex flex-col justify-center align-center w-full">
      <Watches />
      <Notes />
      <Chat />
    </div>
  )
}

export default App
