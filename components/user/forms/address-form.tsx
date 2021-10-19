import React, { useState } from "react";
import type { UserAddressDto, UserFormDto } from "../../../types";

import axios from "../../../util/axios";
import { useForm } from "../../../hooks/useForm";

const sendAddress = (
  data: UserAddressDto
): Promise<{ data: UserAddressDto }> => {
  return axios.post("/api/user/address", data);
};
export interface UserCredentialsFormProps {
  handlerData: (
    type: keyof UserFormDto,
    data: UserAddressDto,
    step: number
  ) => void;
}
const UserAddressForm = ({ handlerData }: UserCredentialsFormProps) => {
  const initialState: UserAddressDto = {
    street: "",
    city: "",
  };
  const [error, setError] = useState("");
  const { state, bind } = useForm(initialState);
  const { street, city } = state;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendAddress({ street, city })
      .then((res) => {
        const data = res.data as UserAddressDto;
        handlerData("address", data, 4);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="street" className="form-label">
          Street
        </label>
        <input
          type="text"
          className="form-control"
          id="street"
          name="street"
          value={street}
          {...bind}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={city}
          {...bind}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Address
      </button>
    </form>
  );
};

export { UserAddressForm };
