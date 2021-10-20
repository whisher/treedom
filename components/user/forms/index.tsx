import React, { useState } from "react";
import type { UserFormDto } from "../../../types";

import { UserAddressForm } from "./address-form";
import { UserCredentialsForm } from "./credentials-form";
import { UserDetailsForm } from "./details-form";

const UserForm = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<UserFormDto>({
    credentials: null,
    details: null,
    address: null,
  });

  const onHandlerData = <KeyType extends keyof UserFormDto>(
    type: KeyType,
    formData: UserFormDto[KeyType],
    step: number
  ) => {
    setData((current) => {
      return { ...current, [type]: formData };
    });
    setStep(step);
  };

  return (
    <div className="slider-container">
      <div className={`slider step-${step}`}>
        <div className="slider-form">
          <UserCredentialsForm handlerData={onHandlerData} />
        </div>
        <div className="slider-form">
          <UserDetailsForm handlerData={onHandlerData} />
        </div>
        <div className="slider-form">
          <UserAddressForm handlerData={onHandlerData} />
        </div>
        <div className="slider-form">
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserForm };
