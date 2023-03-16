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
      title={"Custom App"}
      subtitle={"This is the only page you need to modify if your building a custom app"}
      ctaButtons={buttons}
    />
  );
}
