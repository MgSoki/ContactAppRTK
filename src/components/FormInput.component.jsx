import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";

const FormInput = ({ label, id, message, ...rest }) => {
  return (
    <div className=" space-y-3">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...rest} />
      <Alert className="m-0 p-0 border-0" variant="destructive">
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
};

export default FormInput;
