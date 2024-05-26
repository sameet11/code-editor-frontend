"use client";
import { useState } from "react";
import Playground from "../component/playground";
import PlaygroundLoader from "../component/playgroundloader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {!loading ? (
        <div>
          <div className="mt-5">
            <h1 className="text-xl font-bold mb-1 ml-5 mr-4">
              Create Playground
            </h1>
            <hr />
            <p className="ml-4 mr-4">
              Coding playgrounds on Codedamn are powered by VS Code IDE and
              start within a few seconds. Practice coding while learning for
              free.
            </p>
            <div className="mt-4 lg:flex lg:flex-row flex flex-col">
              <Playground
                title="React"
                tagline="React Playground Using Vite"
                imgLink="/react-logo.jpg"
                setLoading={setLoading}
              />
              <Playground
                title="Node.js"
                tagline="Nodejs 20 playground"
                imgLink="/node-logo.jpg"
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen">
                  <PlaygroundLoader/>
        </div>
      )}
    </>
  );
};

export default Dashboard;
