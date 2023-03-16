import { useEffect } from "react";
import { useRouter } from "next/router";
import { PageContent } from "../components/templates/PageContent";
import { Box, Skeleton } from "@chakra-ui/react";

// export default function Home() {
//   // All params are optional
//   const daos = useFetchDaos({
//     limit: 250,
//     direction: SortDirection.DESC,
//     skip: 0,
//     sortBy: DaoSortBy.CREATED_AT,
//   });

//   return <PageContent title={"Home"} subtitle={"where stuff happens"} />;
// }

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/0x6f07aa7af27e0e06a08a1a17e04c4b0eb11300ab");
    }
  }, [router]);

  return (
    <PageContent
      title={"Redirecting..."}
      content={
        <Skeleton fadeDuration={5}>
          <Box bg="bg-surface" borderRadius="lg" borderWidth="1px" height="full" />
        </Skeleton>
      }
    />
  );
}

export default HomePage;
