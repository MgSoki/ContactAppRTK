import { ContactTable, LoadingComponent, Wrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { useGetAllContactQuery } from "@/store/service/endpoints/contact.endpoints";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewContactPage = () => {
  const { isLoading, data, refetch, isError } = useGetAllContactQuery();
  const nav = useNavigate();

  const handleClick = () => {
    nav("/home/create");
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="min-h-screen py-24 bg-background">
      <Wrapper>
        <div className="flex justify-end py-8">
          <Button className=" flex items-center gap-2" onClick={handleClick}>
            Create Contact
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingComponent />
          </div>
        ) : (
          <>
            {isError ? (
              <div className=" justify-center items-center flex flex-col">
                <p className=" text-red-500">Connection failed...</p>
                <Button onClick={() => refetch()}>Try Again</Button>
              </div>
            ) : (
              <div className="flex justify-center flex-col items-center">
                <p className="text-2xl text-center mb-5 font-serif font-medium text-primary">
                  Your Contact List
                </p>
                <ContactTable data={data.contacts.data} refetch={refetch} />
              </div>
            )}
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default ViewContactPage;
