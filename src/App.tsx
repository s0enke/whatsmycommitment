import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [percentCompleted, setPercentCompleted] = useState(0);

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

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
              setPercentCompleted(percentCompleted);
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
        <progress max={100} value={percentCompleted} className="sr-only" />
      </div>
    </>
  );
}

export default App;
