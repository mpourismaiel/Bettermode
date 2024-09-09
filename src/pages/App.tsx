import { Header } from "../components/Header";
import { Posts1 } from "../components/Posts1";
import { Sidebar } from "../components/Sidebar";

function App() {
  return (
    <div className="bg-surface-2 text-foreground-1 min-h-screen">
      <Header />
      <div className="custom-container-wrapper">
        <div className="custom-container mt-4 grid grid-cols-12 lg:mt-8">
          <Sidebar />
          <Posts1 />
        </div>
      </div>
    </div>
  );
}

export default App;
