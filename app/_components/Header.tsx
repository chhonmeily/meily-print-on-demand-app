"use client";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { CartContext } from "@/context/CartContext";

const menu = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Products",
    path: "/products",
  },
  {
    id: 3,
    name: "AboutUs",
    path: "/",
  },
  {
    id: 4,
    name: "ContactUs",
    path: "/",
  },
];

export type User = {
  email: string;
  name: string;
  picture: string;
};

function Header() {
  const [user, setUser] = useState<User>();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    if (typeof window !== undefined) {
      const tokenResponse = JSON.parse(
        localStorage.getItem("tokenResponse") || "{}"
      );
      if (tokenResponse) {
        GetUserProfile(tokenResponse?.access_token);
      }
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      localStorage.setItem("tokenResponse", JSON.stringify(tokenResponse));
      await GetUserProfile(tokenResponse?.access_token);
      // once you get user save to db with Strapi
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  // Get User Info
  const GetUserProfile = async (access_token: string) => {
    try {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + access_token } }
      );

      console.log(userInfo);
      setUser(userInfo?.data);
      setUserDetail(userInfo?.data);
      SaveNewUser(userInfo?.data);
    } catch (e) {
      localStorage.setItem("tokenResponse", "");
    }
  };

  const SaveNewUser = async (user: User) => {
    const result = await axios.post("/api/users", {
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
    console.log(result.data);
  };

  useEffect(() => {
    user && GetCartList();
  }, [user]);

  const GetCartList = async () => {
    const result = await axios.get("/api/cart?email=" + user?.email);
    setCart(result.data);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <Image src={"/logo.svg"} alt="logo" width={180} height={180} />
      <ul className="flex gap-5">
        {menu.map((item, index) => (
          <li key={index} className="text-lg">
            {item.name}
          </li>
        ))}
      </ul>

      <div className="flex gap-3 items-center">
        <div className="flex gap-2 items-center">
          <ShoppingCart />{" "}
          <span className="p-1 bg-gray-100 px-2 rounded-2xl">
            {cart?.length ?? 0}
          </span>
        </div>
        {!user ? (
          <Button onClick={() => googleLogin()}>Sign In / Sign Up</Button>
        ) : (
          <Image
            src={user.picture}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
}

export default Header;
