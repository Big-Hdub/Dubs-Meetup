import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import { useModal } from "../../context/Modal";
import './LoginForm.css';

const LoginFormModal = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const loginData = {
            credential,
            password
        }
        dispatch(sessionActions.login(loginData))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors)
                else setErrors(data)
            });
    };

    const demoLogin = () => {
        const loginData = {
            credential: "Demo-lition",
            password: "password"
        }
        dispatch(sessionActions.login(loginData))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors)
                else setErrors(data)
            });
    }

    return (
        <section className="login-holder">
            <h2>Log In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    name="Credentials"
                    placeholder="Username or email"
                    type="text"
                    // autoComplete="email username"
                    required
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                />
                <input
                    name="Password"
                    placeholder="Passord"
                    type="password"
                    // autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.message && <p className="errors">{errors.message}</p>}
                {errors.credential && <p className="errors">{errors.credential}</p>}
                {errors.password && <p className="errors">{errors.password}</p>}
                <button id="login-button" className="submit-button" type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
                <p id="demo-login" onClick={demoLogin}>Demo User</p>
            </form>
        </section>
    )
};

export default LoginFormModal;
