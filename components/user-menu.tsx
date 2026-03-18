"use client"

import { useUser, useAuth } from "@insforge/nextjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { motion } from "motion/react"
import { FaUser, FaSignOutAlt } from "react-icons/fa"


export function UserMenu() {
    const { user, isLoaded } = useUser()
    const { signOut } = useAuth()

    if (!isLoaded || !user) return null

    const initials = user.profile?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative size-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg shadow-sm border border-border/10 overflow-hidden outline-none"
                >
                    {user.profile?.avatar_url ? (
                        <img src={user.profile.avatar_url} alt="Avatar" className="size-full object-cover" />
                    ) : (
                        initials
                    )}
                </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] rounded-xl p-2 border border-border/50 bg-background/80 backdrop-blur-md shadow-xl mt-2">
                <div className="px-2 py-3 mb-1">
                    <p className="text-sm font-semibold truncate text-foreground">{user.profile?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-accent group transition-all">
                    <div className="size-8 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <FaUser className="size-3.5" />
                    </div>
                    <span className="text-sm font-medium">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 group transition-all"
                >
                    <div className="size-8 rounded-lg bg-red-50 dark:bg-red-950/20 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-950/40 transition-colors">
                        <FaSignOutAlt className="size-3.5" />
                    </div>
                    <span className="text-sm font-medium">Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
