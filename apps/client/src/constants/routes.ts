import {
  HiOutlineBuildingLibrary,
  HiOutlineHome,
  HiOutlineBanknotes,
  HiOutlineUserGroup,
  HiOutlineCpuChip,
  HiOutlineCog6Tooth,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

export const routes = [
  {
    label: "Home",
    icon: HiOutlineHome,
    href: "/",
    app: true,
  },
  {
    label: "Governance",
    icon: HiOutlineBuildingLibrary,
    href: "/governance",
    app: true,
  },
  {
    label: "Finance",
    icon: HiOutlineBanknotes,
    href: "/finance",
    app: true,
  },
  {
    label: "Community",
    icon: HiOutlineUserGroup,
    href: "/community",
    app: true,
  },
  {
    label: "Custom App",
    icon: HiOutlineCpuChip,
    href: "/custom-app",
    app: true,
  },
  {
    label: "Help",
    icon: HiOutlineQuestionMarkCircle,
    href: "/help",
    app: false,
  },
  {
    label: "Settings",
    icon: HiOutlineCog6Tooth,
    href: "/settings",
    app: false,
  },
];
