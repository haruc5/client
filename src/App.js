import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./routes/Main";
import Create from "./routes/Create";
import Header from "./components/Header";
import Detail from "./routes/Detail";
import List from "./routes/List";
import Modify from "./routes/Modify";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div style={{ padding: "80px 0", width: "1280px", margin: "0 auto" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/create" element={<Create />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/detail/:id/modify" element={<Modify />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
