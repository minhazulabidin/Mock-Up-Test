"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import useUserStore from "./zustandStore/userStore";

export default function SyncUser() {
    const { user, isLoaded } = useUser();
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        if (isLoaded && user) {
            setUser({
                id: user.id,
                fullName: user.fullName,
                email: user.primaryEmailAddress?.emailAddress,
                image: user.imageUrl,
            });
        }
    }, [isLoaded, user]);

    return null;
}