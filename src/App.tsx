import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

export type Data = {
  products: {
    attributes: {
      instanceType: string;
    };
  }[];
};

function App() {
  const [loading, setLoading] = useState(true);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [data, setData] = useState<Data>({ products: [] });

  const initialized = useRef(false);

  const instances = useMemo(() => {
    if (!initialized.current) {
      return [];
    }
    return data.products
      .reduce<string[]>((acc, product) => {
        if (!acc.includes(product.attributes.instanceType)) {
          acc.push(product.attributes.instanceType);
        }
        return acc;
      }, [])
      .sort();
  }, [data]);

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
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <progress max={100} value={percentCompleted} className="sr-only" />
        </div>
      ) : (
        <>
          <h1>Instances</h1>
          <ul role="instances">
            {instances.map((instance) => (
              <li key={instance}>{instance}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default App;
