import { SimpleGrid } from "@chakra-ui/react";
import { FiUsers, FiMail, FiSend } from "react-icons/fi";
import { Stat } from "../atoms/Stat";

export const stats = [
  {
    icon: FiUsers,
    label: "Total Subscribers",
    value: "71,887",
    delta: { value: "320", isUpwardsTrend: true },
  },
  {
    icon: FiMail,
    label: "Avg. Open Rate",
    value: "56.87%",
    delta: { value: "2.3%", isUpwardsTrend: true },
  },
  {
    icon: FiSend,
    label: "Avg. Click Rate",
    value: "12.87%",
    delta: { value: "0.1%", isUpwardsTrend: false },
  },
];

export function StatBar() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
      {stats.map((stat, id) => (
        <Stat key={id} {...stat} />
      ))}
    </SimpleGrid>
  );
}
