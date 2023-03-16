import { ProposalStatus } from "use-aragon";

export const voteStatusColour = (status: ProposalStatus) => {
  switch (status) {
    case ProposalStatus.ACTIVE:
      return "green";
    case ProposalStatus.PENDING:
      return "yellow";
    case ProposalStatus.SUCCEEDED:
      return "teal";
    case ProposalStatus.EXECUTED:
      return "purple";
    case ProposalStatus.DEFEATED:
      return "red";
    default:
      return "gray";
  }
};
