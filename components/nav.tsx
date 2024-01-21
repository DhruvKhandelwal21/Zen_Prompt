"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../public/assets/images/logo.svg";
import menu from "../public/assets/icons/menu.svg";
import { isMobile } from "react-device-detect";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Form from "./form";
const Nav = () => {
  const { data: session } = useSession();
  const [showDropDown, setshowDropDown] = useState(false);
  const [providers, setProviders] = useState(null);
  // const [openCreatePromptDialog, setOpenCreatePromptDialog] = useState(false);
  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="my-2 w-full">
      <div className="my-2 mx-2 flex-between items-center w-full">
        <div className="flex items-center gap-5">
          <Image src={logo} alt="logo" className="object-contain" width={30} />
          <p className="logo_text text-center">Promptopia</p>
        </div>

        {/*Mobile Navigation*/}

        {session?.user ? (
          <div className="flex gap-4 items-center">
            <Image
              src={menu}
              alt="menu"
              className="sm:hidden cursor-pointer"
              width={20}
              height={20}
              onClick={() => {
                setshowDropDown(!showDropDown);
              }}
            />
            {showDropDown && (
              <div className="absolute right-0 flex flex-col gap-2 px-4 py-3 mr-2 top-12 bg-white rounded-md">
                {/* <button
                  className="black_btn"
                  onClick={() => {
                    setOpenCreatePromptDialog(!openCreatePromptDialog);
                    setshowDropDown(!showDropDown);
                  }}
                >
                  Create Post
                </button> */}
                <button className="outline_btn" onClick={() => signOut()}>
                  Sign Out
                </button>
              </div>
            )}
            <Image
              src={session?.user?.image || ""}
              alt="Profile"
              className="sm:hidden rounded-full"
              width={30}
              height={30}
            />
          </div>
        ) : (
          <div className="sm:hidden">
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                ))}
            </>
          </div>
        )}

        {/*Desktop Navigation*/}
        {session?.user ? (
          <div className="sm:flex hidden gap-4">
            {/* <button
              onClick={() => setOpenCreatePromptDialog(!openCreatePromptDialog)}
              className="black_btn"
            >
              Create Post
            </button> */}
            <button onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>
            <Image
              src={session?.user?.image || ""}
              alt="Profile"
              className="rounded-full"
              width={40}
              height={40}
            />
          </div>
        ) : (
          <div className="sm:flex hidden">
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                ))}
            </>
          </div>
        )}
      </div>
      {/* {openCreatePromptDialog && (
        <Form onClose = {()=>{setOpenCreatePromptDialog(!openCreatePromptDialog)}} />
      )} */}
    </div>
  );
};

export default Nav;
