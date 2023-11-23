import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { createUserAsync } from "../../services/api_client";
import { CreateUserDto } from "../../dtos/requests/create_user_dto";

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

    function updateForm(value: Partial<CreateUserDto>) {
        setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newPerson = { ...form, status: "Active" };

        try {
            const response = await createUserAsync(newPerson);

            setForm({
                username: "",
                email: "",
                password: "",
            });

            if (response.error || response.data === false) {
                console.log(response.error);
            }

            if (response.data) {
                const { _id } = response.data;
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("email", `${_id.email}`);
                localStorage.setItem("userId", `${_id._id}`);
                localStorage.setItem("username", `${_id.username}`);

                navigate("/authorised");
            }
        } catch (error) {
            console.error("Error during user creation:", error);
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
