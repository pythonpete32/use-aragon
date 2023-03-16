import { FiDownloadCloud, FiUploadCloud } from "react-icons/fi";
import { PageContent, Variant } from "../../../components/templates/PageContent";

const buttons = [
  {
    label: "Download",
    variant: Variant.PRIMARY,
    onClick: () => console.log("download"),
  },
  {
    label: "Upload",
    variant: Variant.SECONDARY,
    onClick: () => console.log("upload"),
  },
];

export default function Finance() {
  return (
    <PageContent
      title={"Governance"}
      subtitle={"because we all love voting"}
      ctaButtons={buttons}
    />
  );
}
