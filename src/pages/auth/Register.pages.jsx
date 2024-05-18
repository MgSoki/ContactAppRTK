import {
  CardHeaderComponent,
  FormError,
  FormInput,
  LoadingComponent,
  Navigator,
  PreventRoutes,
  Wrapper,
} from "@/components";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useRegisterMutation } from "@/store/service/endpoints/auth.endpoints";
import RegisterError from "@/components/RegisterError.component";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [register, { error, isError, isLoading, data }] = useRegisterMutation();

  // to pass to login page if success
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();

  // form initial values
  const initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  // validation
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Your Name is required!")
      .min(2, "Name must have at least 2 words."),
    email: yup
      .string()
      .required("Email Address is required!")
      .email("Invalid Email format"),
    password: yup
      .string()
      .required("Enter Password!")
      .min(8, "Password should be at least 8"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    register(values);

    // to pass to login page if success
    setFormData({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (data?.success) {
      nav("/", {
        state: {
          success: data?.success,
          formData,
        },
      });
    }
  }, [data]);

  return (
    <PreventRoutes path={"/home"} isAuth={localStorage.getItem("auth")}>
      <div className="min-h-screen bg-background flex justify-center items-center">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className=" basis-full md:basis-2/4">
            <Wrapper>
              <Card className="border-0">
                <CardHeaderComponent
                  title={"Welcome From  Contact App!"}
                  description={"Register account here!"}
                />
                <CardContent>
                  {isError && (
                    <RegisterError
                      error={"Register Fail"}
                      message={error.data.message}
                    />
                  )}
                  <Formik
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    initialValues={initialValue}
                    validateOnChange={false}
                    validateOnBlur={false}
                  >
                    {({
                      handleBlur,
                      handleChange,
                      values,
                      isSubmitting,
                      errors,
                    }) => (
                      <Form className="space-y-5">
                        {/* name */}
                        <div className="space-y-2">
                          <FormInput
                            onChange={handleChange}
                            label={"Name"}
                            onBlur={handleBlur}
                            value={values.name}
                            id={"name"}
                            name="name"
                            type="name"
                            placeholder={"Enter Your Name"}
                          />
                          <FormError name="name" message={errors.name} />
                        </div>
                        {/* email */}
                        <div className="space-y-2">
                          <FormInput
                            onChange={handleChange}
                            label={"Email"}
                            id={"email"}
                            onBlur={handleBlur}
                            type="email"
                            name="email"
                            value={values.email}
                            placeholder={"Enter Your Email"}
                          />
                          <FormError name="email" message={errors.email} />
                        </div>
                        {/* password */}
                        <div className="space-y-2">
                          <FormInput
                            onChange={handleChange}
                            label={"Password"}
                            onBlur={handleBlur}
                            value={values.password}
                            id={"password"}
                            name="password"
                            type="password"
                            placeholder={"Enter Your Password"}
                          />
                          <FormError
                            name="password"
                            message={errors.password}
                          />
                        </div>
                        {/* confirm password */}
                        <div className="space-y-2">
                          <FormInput
                            onChange={handleChange}
                            label={"Confirm Password"}
                            onBlur={handleBlur}
                            value={values.password_confirmation}
                            id={"password_confirmation"}
                            name="password_confirmation"
                            type="password"
                            placeholder={"Confirm Your Password"}
                          />
                          <FormError
                            name="password_confirmation"
                            message={errors.password_confirmation}
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="block w-full"
                        >
                          Register Now
                        </Button>
                        <Navigator
                          path={"/"}
                          name="Login"
                          info={"Already have an account?"}
                        />
                      </Form>
                    )}
                  </Formik>
                </CardContent>
              </Card>
            </Wrapper>
          </div>
        )}
      </div>
    </PreventRoutes>
  );
};

export default RegisterPage;
