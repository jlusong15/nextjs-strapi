"use client";

import { useState } from "react";
import Link from "next/link";
import { Cat, X } from "lucide-react";
import { NavLinks } from "@/app/types/nav.model";

interface MenuNavProps {
  onSidebarToggle?: (open: boolean) => void; // 👈 OUTPUT
}

export default function MenuNav({ onSidebarToggle }: MenuNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((v) => {
      const next = !v;

      // 👇 emit state to parent (like Angular EventEmitter)
      onSidebarToggle?.(next);

      return next;
    });
  };

  const MyIcon = Cat;

  return (
    <aside
      className={`sticky top-0 h-screen bg-primary transition-all duration-300 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div className={`p-2 ${isOpen ? "bg-gray-900/40" : ""}`}>
        <button
          onClick={toggleSidebar}
          className={`text-white rounded transition-all p-3 ${
            isOpen
              ? "w-full"
              : "bg-gray-900/40 hover:bg-gray-900/20 w-full"
          }`}
        >
          <div className="flex items-center justify-between cursor-pointer">
            {isOpen ? (
              <>
                <div className="flex items-center gap-2">
                  <MyIcon className="h-5 w-5 text-white" strokeWidth={1} />
                  <span className="text-xs font-mono italic">
                    dev:jenna
                  </span>
                </div>

                <X className="h-5 w-5 text-white transition-colors hover:text-white/50" />
              </>
            ) : (
              <MyIcon className="h-5 w-6 text-white" strokeWidth={1} />
            )}
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="relative flex flex-col gap-2 p-2 pt-2">
        {NavLinks.map((item) => {
          const Icon = item.icon;

          if (isOpen) {
            return (
              <Link
                key={item.name}
                href={item.route}
                className="flex items-center gap-3 rounded p-3 text-white transition-all hover:bg-gray-900/20"
              >
                {Icon && (
                  <Icon
                    className="h-6 w-6 text-white"
                    strokeWidth={1}
                  />
                )}
                <span>{item.name}</span>
              </Link>
            );
          }

          return Icon ? (
            <Link
              key={item.name}
              href={item.route}
              title={item.name}
              className="flex cursor-pointer items-center justify-center rounded bg-transparent p-3 text-white transition-all hover:bg-gray-900/20"
            >
              <Icon className="h-6 w-6 text-white" strokeWidth={1} />
            </Link>
          ) : null;
        })}
      </nav>
    </aside>
  );
}