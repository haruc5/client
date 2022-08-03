import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./routes/Main";

function App() {
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}`} element={<Main />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
