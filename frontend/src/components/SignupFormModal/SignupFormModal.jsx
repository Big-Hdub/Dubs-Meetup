import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session';
import './SignupForm.css';

const SignupFormModal = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = e => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            const signupData = {
                username,
                firstName,
                lastName,
                email,
                password
            };
            return dispatch(sessionActions.signup(signupData))
                .then(closeModal)
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data?.errors) setErrors(data.errors);
                    });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    return (
        <section className="signup-holder">
            <h1>Sign up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label>
                    <span>First name:</span>
                    <input
                        name="first"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                {errors.firstName && <p>{errors.firstName}</p>}
                <label>
                    <span>Last name:</span>
                    <input
                        name="last"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                {errors.lastName && <p>{errors.lastName}</p>}
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
                {errors.email && <p>{errors.email}</p>}
                <label>
                    <span>Username:</span>
                    <input
                        name="user"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                {errors.username && <p>{errors.username}</p>}
                <label>
                    <span>Password:</span>
                    <input
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <label>
                    <span>Confirm password:</span>
                    <input
                        name="confirm"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                {errors.confirmPassword && (
                    <p>{errors.confirmPassword}</p>
                )}
                <button className="submit-button" type="submit">Sign up</button>
            </form>
        </section>
    )
};

export default SignupFormModal;
