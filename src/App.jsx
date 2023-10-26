import Navbar from "./components/utils/navbar"
import Sidebar from "./components/utils/sidebar"

function App() {

  return (
    <>
    <div className="wrapper flex">
        <Sidebar/>
        <main className="flex-1">
          <Navbar/>
        </main>
    </div>
    </>
  )
}

export default App  
