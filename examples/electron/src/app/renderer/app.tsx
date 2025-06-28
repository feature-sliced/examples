import { Link, Outlet } from 'react-router';
import './app.css';

export const App = () => {
    return (
        <div className="window">
            <div className="content">
                <p className="line">Feature-Sliced Design [Version 2.1]</p>
                <ul className="menu">
                    <li>
                        <span className="prompt">C:\Users\User&gt;</span>
                        <Link to="/" className="link">Home</Link>
                    </li>
                    <li>
                        <span className="prompt">C:\Users\User&gt;</span>
                        <Link to="/user" className="link">User</Link>
                    </li>
                </ul>
                <div className="outlet">
                    <Outlet />
                </div>
                <p className="line">
                    <span className="prompt">C:\Users\User&gt;</span>
                    <span className="cursor">_</span>
                </p>
            </div>
        </div>
    );
};