import React, { useState } from "react";
import type { UserFormDto, UserDetailsDto } from "../../../types";

import axios from "../../../util/axios";
import { useForm } from "../../../hooks/useForm";

const sendDetails = (
  data: UserDetailsDto
): Promise<{ data: UserDetailsDto }> => {
  return axios.post("/api/user/details", data);
};

export interface UserCredentialsFormProps {
  handlerData: (
    type: keyof UserFormDto,
    data: UserDetailsDto,
    step: number
  ) => void;
}

const UserDetailsForm = ({ handlerData }: UserCredentialsFormProps) => {
  const initialState: UserDetailsDto = {
    firstname: "",
    lastname: "",
  };
  const [error, setError] = useState("");
  const { state, bind } = useForm(initialState);
  const { firstname, lastname } = state;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendDetails({ firstname, lastname })
      .then((res) => {
        const data = res.data as UserDetailsDto;
        handlerData("details", data, 3);
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
        <label htmlFor="firstname" className="form-label">
          Fistname
        </label>
        <input
          type="text"
          className="form-control"
          id="firstname"
          name="firstname"
          value={firstname}
          {...bind}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">
          Lastname
        </label>
        <input
          type="text"
          className="form-control"
          id="lastname"
          name="lastname"
          value={lastname}
          {...bind}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary d-block w-100 shadow-none"
        >
          Details
        </button>
      </div>
    </form>
  );
};

export { UserDetailsForm };
