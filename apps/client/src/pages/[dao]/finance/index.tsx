import { FiDownloadCloud, FiUploadCloud } from "react-icons/fi";
import { PageContent, Variant } from "../../../components/templates/PageContent";

const buttons = [
  {
    label: "Download",
    variant: Variant.PRIMARY,
    icon: <FiDownloadCloud fontSize="1.25rem" />,
    onClick: () => console.log("download"),
  },
  {
    label: "Upload",
    variant: Variant.SECONDARY,
    icon: <FiUploadCloud fontSize="1.25rem" />,
    onClick: () => console.log("upload"),
  },
];

export default function Finance() {
  return (
    <PageContent title={"Finance"} subtitle={"where moniesss is managed"} ctaButtons={buttons} />
  );
}
