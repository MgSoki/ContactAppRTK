import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiaEditSolid } from "react-icons/lia";
import {
  useEditContactMutation,
  useGetContactQuery,
} from "@/store/service/endpoints/contact.endpoints";
import { Form, Formik } from "formik";
import { FormError, FormInput, LoadingComponent } from ".";
import * as yup from "yup";

const EditBox = ({ id, refetch }) => {
  const [editContact, res] = useEditContactMutation();
  const [open, setOpen] = useState(false);

  const { data } = useGetContactQuery(id);

  const initialValues = {
    name: data?.contact.name || "",
    phone: data?.contact.phone || "",
    email: data?.contact.email || "",
    address: data?.contact.address || "",
  };

  const handleEdit = async (values) => {
    const arg = { id, values };
    editContact(arg);
  };

  useEffect(() => {
    if (res?.data?.success) {
      refetch();
      setOpen(false);
    }
  }, [res]);

  const validationSchema = yup.object({
    name: yup.string().required("Name is required!"),
    email: yup.string().email("Invalid Email format").optional(),
    phone: yup
      .number()
      .required("Phone Field is required!")
      .typeError("Phone Number must be a number"),
    address: yup
      .string()
      .min(2, "Address Should be at least 2 words")
      .optional(),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" p-0" variant="ghost">
          <LiaEditSolid className="w-7 h-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>
            {res.isLoading
              ? "Editing Your Contact..."
              : "Make changes to your contact here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        {res.isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingComponent />
          </div>
        ) : (
          <Formik
            onSubmit={handleEdit}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
          >
            {({ values, handleChange, errors }) => (
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
      </DialogContent>
    </Dialog>
  );
};

export default EditBox;
