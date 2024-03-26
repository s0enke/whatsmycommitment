import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // retrieve items from aws bulk pricing api

    (async () => {
      try {
        const res = await axios(
          "https://pricing.us-east-1.amazonaws.com/savingsPlan/v1.0/aws/AWSComputeSavingsPlan/20240322163202/eu-central-1/index.json",
          {
            onDownloadProgress: (progressEvent) => {
              const percentCompleted = Math.floor(
                (progressEvent.loaded / progressEvent.total!) * 100,
              );
              console.log("completed: ", percentCompleted);
            },
          },
        );
        console.log(res.data);
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
