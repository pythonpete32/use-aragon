import { Box, HStack, Stack, Text, Badge, Heading } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";
import { TokenVotingProposal } from "use-aragon";
import { getTimeLeft } from "../../lib/getTimeLeft";
import { voteStatusColour } from "../../lib/voteStatusColour";
import { CardContainer } from "../atoms/CardContainer";

export const VoteCard = (props: TokenVotingProposal) => {
  const { status, endDate, metadata } = props;
  const colorScheme = voteStatusColour(status);
  const timeLeft = getTimeLeft(endDate);

  return (
    <CardContainer>
      <HStack justifyContent="space-between">
        <Badge colorScheme={colorScheme}>{status.toUpperCase()}</Badge>
        <HStack spacing="1">
          <Box as={FaClock} color="gray.500" />
          <Text fontSize="sm" color="gray.500">
            {timeLeft}
          </Text>
        </HStack>
      </HStack>
      <Heading fontWeight="medium" size="sm">
        {metadata.title}
      </Heading>
      <Text>{metadata.summary}</Text>
    </CardContainer>
  );
};
