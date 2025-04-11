"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Tag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMobile } from "@/shared/hooks/use-is-mobile";

const navItems = [
  {
    title: "Главная",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Пользователи",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Промокоды",
    href: "/admin/promocodes",
    icon: Tag,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}
      <div
        className={cn(
          "bg-card border-r h-full transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : isMobile ? "w-0" : "w-16",
          isMobile && !isOpen ? "hidden" : ""
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2
              className={cn(
                "font-bold text-xl",
                !isOpen && !isMobile && "hidden"
              )}
            >
              Админка | Проныра
            </h2>
            {!isOpen && !isMobile && (
              <div className="flex justify-center">
                <LayoutDashboard className="h-6 w-6" />
              </div>
            )}
          </div>
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                      !isOpen && !isMobile && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {(isOpen || !isMobile) && (
                      <span className={cn(!isOpen && !isMobile && "hidden")}>
                        {item.title}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
