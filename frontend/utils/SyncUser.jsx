"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
// import useUserStore from "./zustandStore/userStore";

export default function SyncUser() {
    const { user, isLoaded } = useUser();
    const setUser = useUserStore((state) => state.setUser);
    const clearUser = useUserStore((state) => state.clearUser)

    useEffect(() => {
        if (isLoaded && user) {
            setUser({
                id: user.id,
                fullName: user.fullName,
                email: user.primaryEmailAddress?.emailAddress,
                image: user.imageUrl,
            });
        }else{
            clearUser()
        }
    }, [isLoaded, user]);

    return null;
}