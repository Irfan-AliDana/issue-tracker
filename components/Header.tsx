"use client";

import { PiBugFill } from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    const routes: { href: string; label: string }[] = [
        {
            href: "/issues",
            label: "Issues",
        },
        {
            href: "/profile",
            label: "Profile",
        },
    ];

    return (
        <nav className="flex justify-between items-center h-[var(--top-navbar-size)] mb-5 px-20 border-b border-gray-200 shadow">
            <Link href="/">
                <PiBugFill className="h-14 w-14 text-gray-500" />
            </Link>
            <ul>
                <li className="space-x-10">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            className={`${
                                pathname === route.href
                                    ? "text-gray-800"
                                    : "text-gray-600"
                            } hover:text-gray-800 transition-colors`}
                        >
                            {route.label}
                        </Link>
                    ))}
                </li>
            </ul>
        </nav>
    );
};

export default Header;
