import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {

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
                    </div>
                </div>
            </div>
        </>
    )
}