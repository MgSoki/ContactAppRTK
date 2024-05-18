import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditBox, LoadingComponent, ModalBox } from ".";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteContactMutation } from "@/store/service/endpoints/contact.endpoints";

const ContactTable = ({ data, refetch }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const handleDelete = (id) => {
    deleteContact(id);
    refetch();
  };

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Table>
          <TableCaption>
            {data.length == 0
              ? "Your Contact list is empty!"
              : "End of your contact lists"}
          </TableCaption>
          <TableHeader className=" bg-primary">
            <TableRow>
              <TableHead className="w-[100px] text-secondary">#</TableHead>
              <TableHead className=" text-secondary">Name</TableHead>
              <TableHead className=" text-secondary">Phone</TableHead>
              <TableHead className=" text-secondary">Email</TableHead>
              <TableHead className=" text-secondary">Address</TableHead>
              <TableHead className=" text-secondary text-end">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((el) => (
              <TableRow key={el.id}>
                <TableCell className="font-medium num">{""}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.phone}</TableCell>
                <TableCell>{el?.email}</TableCell>
                <TableCell>{el?.address}</TableCell>
                <TableCell className=" flex items-center justify-end">
                  <EditBox refetch={refetch} id={el.id} />
                  <ModalBox
                    variant="ghost"
                    title={"Are you sure to delete this contact?"}
                    description={"This action can't be undone!"}
                    confirm={"Yes, delete this!"}
                    fun={() => handleDelete(el.id)}
                    trigger={<RiDeleteBin6Line className=" w-6 h-6" />}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ContactTable;
