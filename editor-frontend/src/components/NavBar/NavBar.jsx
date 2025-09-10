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
                setUser(null)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="navBar">
                <div className="navLinks">
                    <div className="left-links">
                        <Link to ="/">Your Articles</Link>
                        <Link to="/create">Create Article</Link>
                    </div>
                    <div className="main-title">
                        <h2>Author's Portal</h2>
                    </div>
                    <div className="rightLinks">
                        {/* <Link to ="login">Login</Link>
                        <button className='logOutBtn' onClick={handleLogOut}>Log Out</button> */}
                        <Link to='posts'>All Articles</Link>
                        {user ? ( <button className='logOutBtn' onClick={handleLogOut}>Log Out</button> ) : ( <Link to ="login">Login</Link> ) }
                    </div>
                </div>
            </div>
        </>
    )
}