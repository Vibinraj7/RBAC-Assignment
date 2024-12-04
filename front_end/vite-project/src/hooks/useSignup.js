import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";


const useSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerUser = async (values) => {
        if (values.password !== values.passwordConfirm) {
            return setError("Passwords not Matching")
        }
        try {
            console.log("from fetch part")
            setError(null);
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            })
            const data = await res.json();
            
            if (res.status === 201) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 400) {
                setError(data.message);
            } else {
                message.error('Registration Failed');
            }

        } catch (error) {
            setError('An unexpected error occurred');
            console.error(error);
        } finally {
            setLoading(false)
        }
    }



    return { loading, error, registerUser };
}

export default useSignup

