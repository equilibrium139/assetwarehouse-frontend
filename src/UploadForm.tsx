function UploadForm({ onClose }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const assetFile = formData.get("asset") as File;
    const thumbnailFile = formData.get("thumbnail") as File;
    const assetFilename = assetFile.name;
    const thumbnailFilename = thumbnailFile.name;
    const url = process.env.REACT_APP_API_URL + "/api/assets/upload";
    const response = await fetch(url, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: formData.get("name"), description: formData.get("description"), assetFilename, thumbnailFilename }),
    });
    if (!response.ok) {
      console.error("Failed to upload model", response.statusText);
    } else {
      const json = await response.json();
      const { assetUploadURL, thumbnailUploadURL } = json;
      await fetch(assetUploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": assetFile.type,
          "x-amz-acl": "public-read",
        },
        body: assetFile,
      });
      await fetch(thumbnailUploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": thumbnailFile.type,
          "x-amz-acl": "public-read",
        },
        body: thumbnailFile,
      });
    }
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
