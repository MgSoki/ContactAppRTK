import React from "react";
import { Alert, AlertDescription } from "./ui/alert";

const FormError = ({ message }) => {
  return (
    <Alert className="m-0 p-0 border-0 col-span-full" variant="destructive">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default FormError;
