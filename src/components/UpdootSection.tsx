import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface IUpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FunctionComponent<IUpdootSectionProps> = ({
  post,
}) => {
  const [, vote] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        icon={<ChevronUpIcon />}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        aria-label="updoot post"
        isLoading={loadingState === "updoot-loading"}
      />
      {post.points}
      <IconButton
        icon={<ChevronDownIcon />}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        aria-label="downdoot post"
        isLoading={loadingState === "downdoot-loading"}
      />
    </Flex>
  );
};

export default UpdootSection;
