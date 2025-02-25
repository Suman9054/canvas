import styled from "styled-components";
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [error, setError] = useState("");
  const [read, setRead] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setRead(false);

    const form = e.target as HTMLFormElement;

    try {
      const firstName = (form[0] as HTMLInputElement).value;
      const lastName = (form[1] as HTMLInputElement).value;
      const email = (form[2] as HTMLInputElement).value;
      const password = (form[3] as HTMLInputElement).value;
      const confirmPassword = (form[4] as HTMLInputElement).value;
      const name = firstName + lastName;
      // Validate all fields are filled

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address");
        setRead(true);
        (form[2] as HTMLInputElement).value = ""; // Clear email field
        return;
      }
      if (password.length < 4 || password.length > 8) {
        setError("Password must be between 4 and 8 characters");
        setRead(true);
        (form[3] as HTMLInputElement).value = "";
        (form[4] as HTMLInputElement).value = "";
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        setError("Password does not match");
        setRead(true);
        (form[4] as HTMLInputElement).value = ""; // Clear confirm password field
        return;
      }

      await axios
        .post("http://localhost:3000/api/v1/login-signup/signup", {
          email: email,
          password: password,
          name: name,
        })
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/home";
          } else {
            setError(res.data);
            setRead(true);
          }
        });
    } catch (e) {
      console.log("Error:", e);
      setError("Something went wrong. Please try again.");
      setRead(true);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>

        {read && error && <div className="error-message">{error}</div>}

        <div className="flex">
          <label>
            <input required placeholder="" type="text" className="input" />
            <span>Firstname</span>
          </label>
          <label>
            <input required placeholder="" type="text" className="input" />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input required placeholder="" type="email" className="input" />
          <span>Email</span>
        </label>
        <label>
          <input required placeholder="" type="password" className="input" />
          <span>Password</span>
        </label>
        <label>
          <input required placeholder="" type="password" className="input" />
          <span>Confirm password</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          Already have an acount ? <Link to="/v1/auth/login">Signin</Link>{" "}
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message,
  .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: 0.3s ease;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  .error-message {
    background-color: #ffebee;
    color: #ff3333;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 14px;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  @media (max-width: 480px) {
    .form {
      width: 100%;
      padding: 15px;
    }

    .title {
      font-size: 24px;
    }
  }
`;

export default SignupForm;
