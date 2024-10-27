import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { User } from "./types";
import { useEffect, useState } from "react";
import Modal, { ModalProps } from "./Modal";
import Header from "./Header";

function App() {
  const [user, setUser] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
    onClose: () => {},
    children: null,
  });

  function openModal(children: React.ReactNode, width?: string, height?: string) {
    console.assert(!isModalOpen, "Calling openModal when modal already open");

    const modalProps = {
      onClose: () => setIsModalOpen(false),
      width: width,
      height: height,
      children: children,
    };
    setIsModalOpen(true);
    setModalProps(modalProps);
  }

  function closeModal() {
    console.assert(isModalOpen, "Calling closeModal when no modal is open");
    setIsModalOpen(false);
  }

  useEffect(() => {
    async function tryLoginWithSession() {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const json = await response.json();
        setUser(json);
      }
    }

    if (!user) {
      tryLoginWithSession();
    }
  }, []);

  return (
    <div>
      <Header user={user} setUser={setUser} openModal={openModal} closeModal={closeModal}></Header>
      <Routes>
        <Route path="/" element={<HomePage openModal={openModal} closeModal={closeModal} user={user} />}></Route>
        {/* TODO: direct to signin page for pages that require logged in user */}
        <Route path="/profile" element={user ? <ProfilePage openModal={openModal} closeModal={closeModal} user={user} /> : <h1>Not logged in</h1>}></Route>
      </Routes>
      {isModalOpen && <Modal {...modalProps} />}
    </div>
  );
}

export default App;
