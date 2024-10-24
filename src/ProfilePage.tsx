import { useEffect, useState } from "react";
import { User, Asset } from "./types";
import Gallery from "./Gallery";
import "./App.css";
import AssetViewer from "./AssetViewer";

interface ProfilePageProps {
  openModal: (
    children: React.ReactNode,
    width?: string,
    height?: string
  ) => void;
  closeModal: () => void;
  user: User;
}

// CONTINUE: finish profile page
function ProfilePage({ openModal, closeModal, user }: ProfilePageProps) {
  const [userAssets, setUserAssets] = useState<Asset[]>([]);

  useEffect(() => {
    async function fetchUserAssets() {
      const response = await fetch("http://localhost:8080/api/user/assets", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("HTTP error! Status: ${response.status}");
      }

      const assets = await response.json();
      setUserAssets(assets);
    }

    try {
      fetchUserAssets();
    } catch (error) {
      console.log("Error fetching user assets: ${error}");
    }
  }, []);

  function handleThumbnailClicked(assetClicked: Asset) {
    openModal(<AssetViewer asset={assetClicked} />, "800px", "600px");
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <Gallery
        onThumbnailClicked={handleThumbnailClicked}
        assets={userAssets}
      ></Gallery>
    </div>
  );
}

export default ProfilePage;
