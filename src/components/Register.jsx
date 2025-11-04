import React, { useState } from "react";

export default function Register({ setCurrentUser }) {
    const [mode, setMode] = useState("signup"); // "signup" or "login"
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function resetForm() {
        setUserName("");
        setEmail("");
        setPassword("");
    }

    function signUp(e) {
        e.preventDefault();

        if (localStorage.getItem(`user:${userName}`)) {
            alert("Username already exists");
            return;
        }
        if (!validateEmail(email)) {
            alert("Invalid email format");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        const newUser = {
            email,
            password,
            savedTexts: {} // where you can store this user’s texts later
        };
        localStorage.setItem(`user:${userName}`, JSON.stringify(newUser));
        setCurrentUser(userName);
        alert("Account created!");
        resetForm();
    }

    function logIn(e) {
        e.preventDefault();

        const userData = localStorage.getItem(`user:${userName}`);
        if (!userData) {
            alert("User does not exist");
            return;
        }
        const user = JSON.parse(userData);
        if (user.password !== password) {
            alert("Incorrect password");
            return;
        }

        setCurrentUser(userName);
        alert("Logged in!");
        resetForm();
    }

    return (
        <div className="register-container">
            <form
                className="register-form"
                onSubmit={mode === "signup" ? signUp : logIn}
            >
                <input
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                {mode === "signup" && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />

                <button type="submit">
                    {mode === "signup" ? "Sign Up" : "Log In"}
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setMode(mode === "signup" ? "login" : "signup")
                    }
                >
                    {mode === "signup"
                        ? "Already have an account? Log in"
                        : "Don’t have an account? Sign up"}
                </button>
            </form>
        </div>
    );
}
