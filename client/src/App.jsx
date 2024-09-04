import toast from "react-hot-toast"


const App = () => {
  const notify = () => toast('Here is your toast.')
  return (
    <button className="btn" onClick={notify}>Hello daisyUI</button>
  )
}

export default App
