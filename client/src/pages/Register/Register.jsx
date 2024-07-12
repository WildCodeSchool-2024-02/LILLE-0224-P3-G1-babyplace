import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // Mail textfield reference
  const emailRef = useRef();

  // States for the password and password's confirmation
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Navigation hook
  const navigate = useNavigate();

  // Password changes handler
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Password changes confirmation handler
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Nex user API call
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/account`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password,
          }),
        }
      );

      // Successful connection redirection
      if (response.status === 201) {
        navigate("/LoginPro");
      } else {
        // Detailed log in case of an error
        console.info(response);
      }
    } catch (err) {
      // Possible logs errors
      console.error(err);
    }
  };

  // Component form return
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Email textfield */}
        <label htmlFor="email">email</label>{" "}
        <input ref={emailRef} type="email" id="email" />
      </div>
      <div>
        {/* Password textfield */}
        <label htmlFor="password">password</label>{" "}
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />{" "}
        {/* Password strenght indicator */}
        {password.length >= 8 ? "✅" : "❌"} {`length: ${password.length} >= 8`}
      </div>
      <div>
        {/* Password confirmation textfield */}
        <label htmlFor="confirm-password">confirm password</label>{" "}
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />{" "}
        {/* Corresponding password indicator */}
        {password === confirmPassword ? "✅" : "❌"}
      </div>
      {/* Form submission button */}
      <button type="submit">Send</button>
    </form>
  );
}

export default Register;
