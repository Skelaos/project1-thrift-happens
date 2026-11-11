import "./App.css";
import data from "./data/data";
import ThriftHappensApp from "./components/ThriftHappensApp";

function App() {
  return (
    <>
      <ThriftHappensApp data={data} />
    </>
  );
}

export default App;
