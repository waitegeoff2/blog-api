import { useState } from "react";
import './Login.css'
import { useOutletContext, useNavigate } from "react-router";

export default function LoginForm() {
    //handle submit (make post request to api, get JWT token back)
    const{setTriggerJwt} = useOutletContext();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errArray, setErrArray] = useState([]);

    const navigate = useNavigate();


    const validateForm = () => {
        let newErrors = [];
        let isValid = true;

        //validations

        if (!username) {
            newErrors.push('Username is required.');
            isValid = false;
        }

        if (!password) {
            newErrors.push('Password is required.');
            isValid = false;
        }

        setErrArray(newErrors);
        return isValid;
    };

   async function handleSubmit(e) {
        e.preventDefault()
        //if validation form returns true, continue with submission
        if(validateForm()) {
            fetch("http://localhost:3000/login", { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), 
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {   
                if(response.message == 'Unauthorized') {
                    // add to errors array
                    let newErrors = [];
                    newErrors.push('Invalid credentials.')
                    setErrArray(newErrors)
                } else {
                    let data = response.token
                    localStorage.setItem('jwtToken', data)
                    //trigger Jwt useeffect
                    setTriggerJwt('new')
                    console.log("token put into localStorage")
                    navigate('/');
                }
                console.log(response)
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
            <h2>Login:</h2>
            <ul className="errors-list">
                {errArray.map((error) =>(
                    <li>{error}</li>
                ))}
            </ul>
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-section">
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
                </div>
                <div className="form-section">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="submit-btn" type="submit">Login</button>
            </form>
        </div>
    )
}