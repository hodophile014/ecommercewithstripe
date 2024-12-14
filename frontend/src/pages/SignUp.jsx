import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setCookies }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const result = await axios.post('http://localhost:4242/user/register', ({ email, name, password }));
            setCookies('authToken', result.data.token);
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div style={styles.container}>
            <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md h-full mt-28 w-[30%]">
                <h2 style={{marginLeft:"20px"}} className="text-3xl font-extrabold text-gray-900 text-center mb-6 ">Register</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={styles.input}
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={styles.input}
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={styles.input}
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                style={styles.input}
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            style={styles.button}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.25rem',
        marginBottom: '1rem',
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '0.25rem',
        backgroundColor: '#2563eb',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default SignUp;