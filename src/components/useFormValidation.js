import { useState, useEffect, useMemo } from "react";

export function useFormValidation(values) {
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        validate();
    }, [values]);

    const validate = () => {
        setErrors({
            name: values.name.length < 3 ? "Имя должно содержать хотя бы 3 символа" : "",
            email: !/^\S+@\S+\.\S+$/.test(values.email) ? "Введите правильный email" : "",
            password: values.password.length < 6 ? "Пароль должен содержать не менее 6 символов" : ""
        });
    };

    const isValid = useMemo(() => {
        return Object.values(errors).every(error => error === "");
    }, [errors]);

    return { errors, isValid };
}
