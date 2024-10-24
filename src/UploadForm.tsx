function UploadForm({ onClose }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = "http://localhost:8080/api/assets/upload";
    fetch(url, {
      credentials: "include",
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload model");
        }
        return response.json();
      })
      .then((json) => console.log(json));
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Asset</h2>

      <label>
        Name:
        <input type="text" name="name" required></input>
      </label>

      <label>
        Description:
        <input type="text" name="description" required></input>
      </label>

      <label>
        Thumbnail:
        <input type="file" name="thumbnail" accept="image/*" required></input>
      </label>

      <label>
        Asset:
        <input type="file" name="asset" accept=".glb, .obj" required></input>
      </label>

      <button className="submitButton" type="submit">
        Upload
      </button>
    </form>
  );
}

export default UploadForm;
