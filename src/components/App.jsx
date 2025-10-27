import './App.css'
import Keyboard from './Keyboard'
function App() {
  function handleKeyPress() {

  }
  return (
    <>
      <Keyboard language="hebrew" onKeyPress={handleKeyPress} />
    </>
  )
}

export default App
