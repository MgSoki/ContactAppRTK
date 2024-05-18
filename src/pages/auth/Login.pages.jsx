import React, { useEffect, useState } from "react";
import {
  CardHeaderComponent,
  FormError,
  FormInput,
  LoadingComponent,
  Navigator,
  Wrapper,
  PreventRoutes,
  RegisterError,
} from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useLoginMutation } from "@/store/service/endpoints/auth.endpoints";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  const { state } = useLocation();

  // query login
  const [login, { isLoading, data }] = useLoginMutation();

  const [error, setError] = useState(false);

  // form initial values
  const initialValue = {
    email: state?.formData?.email || "",
    password: state?.formData?.password || "",
  };

  // validation
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email Address is required!")
      .email("Invalid Email format"),
    password: yup
      .string()
      .required("Enter Password!")
      .min(8, "Password should be at least 8"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const res = await login(values);
    if (!res.data.success) {
      setError(true);
    }
    resetForm();
  };

  useEffect(() => {
    if (data?.success) {
      localStorage.setItem("auth", data.token);
      nav("/home");
    }
  }, [data]);

  return (
    <PreventRoutes path={"/home"} isAuth={localStorage.getItem("auth")}>
      <div className=" h-screen bg-background flex justify-center items-center">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <div className=" basis-3/3 md:basis-2/4">
              <Wrapper>
                <Card className="border-0">
                  <CardHeaderComponent
                    title={
                      state?.success
                        ? "Registration Successful!"
                        : "Welcome Back!"
                    }
                    description={"Login Here"}
                  />
                  <CardContent>
                    {error && (
                      <RegisterError
                        error={"Login Failed"}
                        message={"Email or Password doesn't match"}
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

                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="block w-full"
                          >
                            Login Now
                          </Button>
                          <Navigator
                            path={"/register"}
                            info={"Don't have an account?"}
                            name="Register"
                          />
                        </Form>
                      )}
                    </Formik>
                  </CardContent>
                </Card>
              </Wrapper>
            </div>
          </>
        )}
      </div>
    </PreventRoutes>
  );
};

export default LoginPage;
