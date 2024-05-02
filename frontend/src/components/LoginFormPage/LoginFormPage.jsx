import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Navigate } from 'react-router-dom'
import './LoginForm.css';

const LoginFormPage = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const session = useSelector(state => state.session.user);

    if (session) return <Navigate to="/" replace={true} />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const loginData = {
            credential,
            password
        }
        let user = await dispatch(sessionActions.login(loginData));
        if (user?.errors) setErrors(user.errors);
    };

    return (
        <section className="login-holder">
            <h1>Log In</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    <span>
                        Credentials:
                    </span>
                    <input type="text" placeholder="Username/E-mail" required value={credential} onChange={(e) => setCredential(e.target.value)} />
                </label>
                <label>
                    <span>
                        Password:
                    </span>
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                {errors.credential && <p>{errors.credential}</p>}
                <button type="submit">Log In</button>
            </form>
        </section>
    )
};

export default LoginFormPage;
