import { Routes, Route, Link, Outlet } from "react-router-dom";
import Test from "./components/test"; 
import HomePage from "./components/home"; 

function Layout() {
  return (
    <div className="app">
      <header className="header">
        <Link className="menu-button" to="/">Home</Link>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="new" element={<Test />} />
      </Route>
    </Routes>
  );
}
