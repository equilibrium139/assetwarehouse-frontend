import { useState, useEffect } from "react";
import { Asset, User } from "./types";
import Gallery from "./Gallery";
import "./App.css";

interface HomePageProps {
  openModal: (children: React.ReactNode, width?: string, height?: string) => void;
  closeModal: () => void;
  user: User | undefined;
}

function HomePage({ openModal, closeModal, user }: HomePageProps) {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    async function loadPopularAssets() {
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/assets/popular/10", { credentials: "include" });
      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
      } else {
        const assets = await response.json();
        setAssets(assets);
      }
    }
    loadPopularAssets();
  }, []);

  return <div>{assets && <Gallery openModal={openModal} closeModal={closeModal} assets={assets} setAssets={setAssets} user={user} />}</div>;
}

export default HomePage;
