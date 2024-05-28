import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session';
import './SignupForm.css';

const SignupFormModal = ({ navigate }) => {
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
                .then(navigate("/"))
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
                <input
                    placeholder="First name"
                    name="first"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <p className="errors">{errors.firstName}</p>}
                <input
                    placeholder="Last name"
                    name="last"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <p className="errors">{errors.lastName}</p>}
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="errors">{errors.email}</p>}
                <input
                    placeholder="Username"
                    name="user"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="errors">{errors.username}</p>}
                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="errors">{errors.password}</p>}
                <input
                    placeholder="Confirm Password"
                    name="confirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                    <p className="errors">{errors.confirmPassword}</p>
                )}
                <button id="sign-up-button"
                    className="submit-button"
                    type="submit"
                    disabled={
                        firstName.length < 1 ||
                        lastName.length < 1 ||
                        email.length < 1 ||
                        username.length < 4 ||
                        password.length < 6
                    }
                >Sign up</button>
            </form>
        </section>
    )
};

export default SignupFormModal;
