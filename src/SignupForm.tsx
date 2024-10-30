import { User } from "./types";

function SignUpForm({ onClose, setUser }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(process.env.REACT_APP_API_URL + "/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (!response.ok) {
      console.log("Error creating account: ", response.status);
    } else {
      const json: User = await response.json();
      setUser(json);
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        Username:
        <input type="text" name="username" required></input>
      </label>

      <label>
        Email:
        <input type="email" name="email" required></input>
      </label>

      <label>
        Password:
        <input type="password" name="password" required></input>
      </label>

      <button className="submitButton" type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
