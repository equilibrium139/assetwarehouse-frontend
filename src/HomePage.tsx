import { useState, useEffect } from "react";
import { Asset, User } from "./types";
import UploadForm from "./UploadForm";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import AssetViewer from "./AssetViewer";
import Gallery from "./Gallery";
import Header from "./Header";
import Modal, { ModalProps } from "./Modal";
import "./App.css";

interface HomePageProps {
  openModal: (
    children: React.ReactNode,
    width?: string,
    height?: string
  ) => void;
  closeModal: () => void;
  user: User | undefined;
  setUser: (user: User) => void;
}

function HomePage({ openModal, closeModal, user, setUser }: HomePageProps) {
  const [galleryAssets, setGalleryAssets] = useState<Asset[]>();

  useEffect(() => {
    async function loadPopularAssets() {
      const response = await fetch(
        "http://localhost:8080/api/assets/popular/10"
      );
      if (!response.ok) {
        throw new Error("HTTP error! Status: ${response.status}");
      }
      const assets = await response.json();
      setGalleryAssets(assets);
    }
    loadPopularAssets();
  }, []);

  function handleUploadClicked() {
    console.assert(user, "User must be logged in for upload form to appear");
    openModal(<UploadForm onClose={closeModal} />, "800px", "600px");
  }

  function handleLoginClicked() {
    openModal(
      <LoginForm onClose={closeModal} setUser={setUser} />,
      "600px",
      "400px"
    );
  }

  function handleSignUpClicked() {
    openModal(
      <SignUpForm onClose={closeModal} setUser={setUser} />,
      "600px",
      "400px"
    );
  }

  function handleThumbnailClicked(assetClicked: Asset) {
    openModal(<AssetViewer asset={assetClicked} />, "800px", "600px");
  }

  return (
    <div>
      <Header
        user={user}
        onUploadClicked={handleUploadClicked}
        onLoginClicked={handleLoginClicked}
        onSignupClicked={handleSignUpClicked}
      />
      {galleryAssets && (
        <Gallery
          onThumbnailClicked={handleThumbnailClicked}
          assets={galleryAssets}
        />
      )}
    </div>
  );
}

export default HomePage;
