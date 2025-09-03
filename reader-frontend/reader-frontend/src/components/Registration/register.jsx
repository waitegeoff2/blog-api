import { useState } from "react";

export default function RegistrationForm() {
    //handle submit (make post request to api, update user)
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errArray, setErrArray] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault()

        fetch("http://localhost:3000/signup", { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, username, password }), 
        })
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });

    }

    return (
        <div className="registration-section">
            {errArray.map((error) =>(
                <span>`${error}`</span>
            ))}
            <h2>Register:</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name:</label>
                <input 
                    type="text"
                    id='name' 
                    name='name'
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="name">Username:</label>
                <input 
                    type="email"
                    id='username' 
                    name='username'
                    placeholder="Your email (aaa@aaa.com)"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id='password' 
                    name='password'
                    placeholder="Passwords must match"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input 
                    type="password"
                    id='confirmPassword' 
                    name='confirmPassword'
                    placeholder="Passwords must match"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}