import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/views/home";
import Dashboard from "./components/views/dashboard";
import { useEffect } from "react";
import { getUserHandler } from "./redux/actions/action-auth";
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(getUserHandler())
  }, [])
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Route exact path="/" component={Home} />
        <Route path="/Dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
