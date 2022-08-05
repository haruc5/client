import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./routes/Main";
import Create from "./routes/Create";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div style={{ padding: "80px 0", width: "1280px", margin: "0 auto" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
