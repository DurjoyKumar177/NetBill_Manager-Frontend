import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./Pages/Home";
import UpdateProfile from "./Pages/UpdateProfile";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
      <Home></Home>
      <UpdateProfile></UpdateProfile>
      
    </>
  );
}

export default App;
