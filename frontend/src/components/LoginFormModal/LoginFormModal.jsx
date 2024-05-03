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
                if (data?.errors) setErrors(data.errors);
            });
    };

    return (
        <section className="login-holder">
            <h1>Log In</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    <span>Credentials:</span>
                    <input
                        name="Credentials"
                        type="text"
                        autoComplete="email username"
                        required
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        name="Password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {errors.credential && <p className="errors">{errors.credential}</p>}
                <button className="submit-button" type="submit">Log In</button>
            </form>
        </section>
    )
};

export default LoginFormModal;
