import React from "react";
import { useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@chakra-ui/react";
import { ValidatedInput } from "../atoms/form/ValidatedInput";
import { ValidatedTextarea } from "../atoms/form/ValidatedTextarea";
import { ValidatedSlider } from "../atoms/form/ValidatedSlider";
import { CreateMajorityVotingProposalParams, ProposalMetadata, useNewProposal } from "use-aragon";

const FormSchema: ZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  description: z.string().optional(),
  duration: z.number().min(1).max(7),
});

type FormData = z.infer<typeof FormSchema>;

const SignalVoteForm: React.FC<{ id: string }> = ({ id }) => {
  const { mutate: createProposal } = useNewProposal<
    CreateMajorityVotingProposalParams,
    ProposalMetadata
  >();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(FormSchema) });

  const onSubmit = (data: FormData) => {
    const proposalMetadata: ProposalMetadata = {
      title: data.title,
      summary: data.summary,
      description: data.description || "",
      resources: [],
    };

    const proposalParams: CreateMajorityVotingProposalParams = {
      metadata: proposalMetadata,
      endDate: new Date(Date.now() + data.duration * 24 * 60 * 60 * 1000),
    };

    createProposal(proposalParams);
  };

  return (
    <Box as="form" id={id} py={{ base: "0", sm: "8" }} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="8">
        <ValidatedInput
          control={control}
          error={errors.title}
          name={"title"}
          defaultValue=""
          label={"Proposal Title"}
        />
        <ValidatedTextarea
          control={control}
          error={errors.summary}
          name={"summary"}
          label={"Summary"}
        />
        <ValidatedTextarea
          control={control}
          error={errors.description}
          name={"description"}
          label={"Vote description"}
        />
        <ValidatedSlider
          control={control}
          error={errors.duration}
          name={"duration"}
          label={"Vote Length"}
          min={1}
          max={7}
          step={1}
          defaultValue={1}
        />
      </Stack>
    </Box>
  );
};

export default SignalVoteForm;
