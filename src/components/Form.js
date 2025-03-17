import React, { useState, useRef, useEffect, useCallback } from "react";
import { useFormValidation } from "./useFormValidation";
import "../styles/styles.css";

const Form = () => {
    const [values, setValues] = useState({ name: "", email: "", password: "" });
    const { errors, isValid } = useFormValidation(values);
    const nameRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!isValid) {
            if (errors.name) nameRef.current.focus();
        }
    }, [errors]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            setSubmitted(true);
        }
    };

    return (
        <div className="form-container">
            <h2>Регистрация</h2>
            {submitted ? (
                <p className="success-message">Форма успешно отправлена!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Имя</label>
                        <input
                            ref={nameRef}
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <button type="submit" disabled={!isValid}>Отправить</button>
                </form>
            )}
        </div>
    );
};

export default Form;
