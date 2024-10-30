import { User } from "./types";

function LoginForm({ onClose, setUser }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(process.env.API_URL + "/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (!response.ok) {
      console.log("Error logging in: ", response.status);
    } else {
      const json: User = await response.json();
      setUser(json);
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <label>
        Email:
        <input type="email" name="email" required></input>
      </label>

      <label>
        Password:
        <input type="password" name="password" required></input>
      </label>

      <button className="submitButton" type="submit">
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
