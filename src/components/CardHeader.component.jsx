import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CardHeaderComponent = ({ title, description }) => {
  return (
    <CardHeader>
      <CardTitle className="text-center text-2xl font-serif">{title}</CardTitle>
      <CardDescription className="text-center text-xl">{description}</CardDescription>
    </CardHeader>
  );
};

export default CardHeaderComponent;
