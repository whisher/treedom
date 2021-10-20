import React, { useState } from "react";
import type { UserCredentialsDto, UserFormDto } from "../../../types";

import axios from "../../../util/axios";
import { useForm } from "../../../hooks/useForm";

const sendCredentials = (
  data: UserCredentialsDto
): Promise<{ data: UserCredentialsDto }> => {
  return axios.post("/api/user/credentials", data);
};
export interface UserCredentialsFormProps {
  handlerData: (
    type: keyof UserFormDto,
    data: UserCredentialsDto,
    step: number
  ) => void;
}
const UserCredentialsForm = ({ handlerData }: UserCredentialsFormProps) => {
  const initialState: UserCredentialsDto = {
    email: "",
    password: "",
  };
  const [error, setError] = useState("");
  const { state, bind } = useForm(initialState);
  const { email, password } = state;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendCredentials({ email, password })
      .then((res) => {
        const data = res.data as UserCredentialsDto;
        handlerData("credentials", data, 2);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <form className="flex-fill" onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          {...bind}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          {...bind}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary d-block w-100 shadow-none"
        >
          Credentials
        </button>
      </div>
    </form>
  );
};

export { UserCredentialsForm };
