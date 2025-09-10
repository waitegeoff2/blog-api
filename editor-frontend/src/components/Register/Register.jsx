import { useState } from "react";
import { useNavigate } from "react-router";
import './Register.css'

export default function RegistrationForm() {
    //handle submit (make post request to api, update user)
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errArray, setErrArray] = useState([]);
    const apiUrl = import.meta.env.VITE_API_LINK;


    const navigate = useNavigate()

    const validateForm = () => {
        let newErrors = [];
        let isValid = true;

        //validations
        if (!name) {
            newErrors.push('Your name is required.');
            isValid = false;
        }

        if (!username) {
            newErrors.push('Username is required.');
            isValid = false;
        }

        if (!password) {
            newErrors.push('Password is required.');
            isValid = false;
        }

        if(password !== confirmPassword) {
            newErrors.push('Passwords must match.');
            isValid = false;
        }

        setErrArray(newErrors);
        return isValid;
    };

    async function handleSubmit(e) {
        e.preventDefault()

        //if validation form returns true, continue with submission
        if(validateForm()) {
            fetch(`${apiUrl}/auth-signup`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, username, password, confirmPassword }), 
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {   
                console.log(response)
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            //if form isn't legit, don't submit
            console.log('Form has errors, cannot submit.');
        }

    }

    return (
        <div className="registration-section">
            <h2>Register:</h2>
            <ul className="errors-list">
            {errArray.map((error, index) =>(
                <li key={index}>{error}</li>
            ))}
            </ul>
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
                    id='confirmpassword' 
                    name='confirmpassword'
                    placeholder="Passwords must match"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button className="submitBtn" type="submit">Register</button>
            </form>
        </div>
    )
}