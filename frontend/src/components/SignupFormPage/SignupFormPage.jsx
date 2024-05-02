import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { useNavigate } from 'react-router-dom'
import './SignupForm.css';

const SignupFormPage = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/', { replace: true, state: { ...user } })
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const signupData = {
            username,
            firstName,
            lastName,
            email,
            password
        };
        return dispatch(sessionActions.signup(signupData)).catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            })
    };

    return (
        <section className="signup-holder">
            <h1>Sign up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label>
                    <span>First name:</span>
                    <input
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Last name:</span>
                    <input
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Username:</span>
                    <input
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        name="Password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {errors.credential && <p className="errors">{errors.credential}</p>}
                <button type="submit">Sign up</button>
            </form>
        </section>
    )
};

export default SignupFormPage;
