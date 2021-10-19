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
    <div>
      <div>
        <progress max="4" value={step} />
      </div>
      {step === 1 && <UserCredentialsForm handlerData={onHandlerData} />}
      {step === 2 && <UserDetailsForm handlerData={onHandlerData} />}
      {step === 3 && <UserAddressForm handlerData={onHandlerData} />}
      {step === 4 && <div>{JSON.stringify(data, null, 2)}</div>}
    </div>
  );
};

export { UserForm };
