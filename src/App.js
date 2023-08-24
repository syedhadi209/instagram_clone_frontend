import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import SideBar from "./components/SideBar/SideBar";
import Settings from "./components/Settings/Settings";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";

function App() {
  const location = useLocation();
  const pathsWithoutSidebar = ["/auth/login", "/auth/signup"];
  const shouldShowSidebar = !pathsWithoutSidebar.includes(location.pathname);
  return (
    <div className="App">
      <div className="main" style={{ display: "flex" }}>
        {shouldShowSidebar && (
          <div className="sidebar-main-h">
            <SideBar />
          </div>
        )}
        <div className="routes" style={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
