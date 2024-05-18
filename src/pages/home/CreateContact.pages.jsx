import { FormError, FormInput, LoadingComponent, Wrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { useCreateContactMutation } from "@/store/service/endpoints/contact.endpoints";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const CreateContactPage = () => {
  // using query
  const [createContact, { isLoading, data }] = useCreateContactMutation();

  const nav = useNavigate();

  const handleSubmit = async (values) => {
    await createContact(values);
  };

  useEffect(() => {
    if (data?.success) {
      nav("/home");
    }
  }, [data]);

  // form initial values
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    address: "",
  };

  // form validation
  const validationSchema = yup.object({
    name: yup.string().required("Name is required!"),
    email: yup.string().email("Invalid Email format"),
    phone: yup
      .number()
      .required("Phone Field is required!")
      .typeError("Phone Number must be a number"),
    address: yup.string().min(2, "Address Should be at least 2 words"),
  });

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Wrapper>
        <div className="mb-12 text-center">
          <p className="text-2xl font-semibold font-serif">Create Contact</p>
        </div>
        {isLoading ? (
          <div className="flex py-48 justify-center">
            <LoadingComponent />
          </div>
        ) : (
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleChange, values, errors }) => (
              <Form>
                <FormInput
                  value={values.name}
                  onChange={handleChange}
                  label={"Name"}
                  type="text"
                  name="name"
                />
                <FormError name="name" message={errors.name} />
                <FormInput
                  value={values.phone}
                  onChange={handleChange}
                  label={"Phone"}
                  type="text"
                  name="phone"
                />
                <FormError name="phone" message={errors.phone} />
                <FormInput
                  value={values.email}
                  onChange={handleChange}
                  label={"Email"}
                  type="text"
                  name="email"
                />
                <FormError name="email" message={errors.email} />
                <FormInput
                  value={values.address}
                  onChange={handleChange}
                  label={"Address"}
                  type="text"
                  name="address"
                />
                <FormError name="address" message={errors.address} />
                <Button className="w-full block" type="submit">
                  Create Contact Now
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Wrapper>
    </div>
  );
};

export default CreateContactPage;
