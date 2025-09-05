import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar({user, setUser, setTriggerJwt}) {


    function handleLogOut() {
        fetch("http://localhost:3000/login/logout", { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            })
            .then((response) => {
                return response.json();
                
            })
            .then((response) => {   
                console.log(response)
                localStorage.removeItem("jwtToken")
                setTriggerJwt('logged out')
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="navBar">
                <div className="navLinks">
                    <div className="leftLinks">
                        <Link to ="/">Home</Link>
                    </div>
                    <div className="rightLinks">
                        <Link to ="register">Register</Link>
                        <Link to ="login">Login</Link>
                        <button className='logOutBtn' onClick={handleLogOut}>Log Out</button>
                    </div>
                </div>
            </div>
        </>
    )
}