import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createUser } from "../services/api_client";
import { User } from "../dtos/user";
import { CreateUserDto } from "../dtos/requests/create_user_dto";

export interface RegistrationFormData {
    username: string;
    email: string;
    password: string;
}

function CreateUserComponent() {
    const [form, setForm] = useState<CreateUserDto>({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    function updateForm(value: Partial<User>) {
        setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newPerson = { ...form, status: "Active" };

        const response = await createUser(newPerson);
        setForm({
            username: "",
            email: "",
            password: "",
        });

        if (response.error || response.data?.success === false) {
            window.alert(response.data?.message);
        }

        if (response.data?.success) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("username", `${response.data.username}`);
            localStorage.setItem("userId", `${response.data.userId}`);

            navigate("/authorised");
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={form.username}
                    onChange={(e) => updateForm({ username: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={(e) => updateForm({ password: e.target.value })}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Sign up
            </button>
        </form>
    );
}

export { CreateUserComponent };
