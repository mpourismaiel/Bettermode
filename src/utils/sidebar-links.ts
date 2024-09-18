import { BookAIcon, BookMarkedIcon, HomeIcon } from "lucide-react";

export const sidebarLinks = [
  {
    to: "/",
    text: "Home",
    icon: HomeIcon,
  },
  {
    to: "/docs",
    text: "Documentation",
    icon: BookMarkedIcon,
  },
  {
    to: "https://developers.bettermode.com/docs/guide/",
    text: "Api",
    target: "_blank",
    icon: BookAIcon,
  },
];
