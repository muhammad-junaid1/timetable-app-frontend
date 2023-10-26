import { useSelector, useDispatch } from "react-redux"
import { setName } from "./components/utils/userslice";

function App() {

  const userName = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setName("Junaid"));
  }
  return (
    <><div className="container p-3">
      
        <h1 className="text-red-500 text-3xl mb-2">Hello {userName}</h1>
        <button type="button" className="bg-purple-600 px-2 rounded text-white" onClick={handleClick}>Change the Username</button>
    </div>
    </>
  )
}

export default App  
