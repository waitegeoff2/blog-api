import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {

    function handleLogOut() {
        fetch("http://localhost:3000/logout", { 
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
                        <a onClick={handleLogOut}>Log Out</a>
                    </div>
                </div>
            </div>
        </>
    )
}