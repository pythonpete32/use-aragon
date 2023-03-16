import { GridItem, Grid } from "@chakra-ui/react";

export function TwoThirdSplitLayout({ left, right }) {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "2fr 1fr",
      }}
      gap={{ base: "4", md: "6" }}
      py={{ base: "4", md: "8" }}
      height="full"
    >
      <GridItem w="100%" gridColumn={{ base: "1 / -1", md: "1 / 2" }}>
        {left}
      </GridItem>
      <GridItem gridColumn={{ base: "1 / -1", md: "2 / 3" }}>{right}</GridItem>
    </Grid>
  );
}
