import { useQuery } from "@apollo/client/react/hooks";
import { useParams } from "react-router-dom";

import { Post as PostComponent } from "../components/Post";
import { Replies } from "../components/Post/Replies";
import { Placeholder } from "../components/ui/Placeholder";
import GET_POST from "../queries/get-post.gql";

export const Post = () => {
  const { slugAndId } = useParams();
  const id = slugAndId?.split("-").pop() || "";
  const { data, loading, error } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="col-span-9 flex flex-col gap-8">
      {loading ? (
        <Placeholder className="h-[200px] w-full" />
      ) : (
        <PostComponent post={data.post} />
      )}
      <Replies postId={id} />
    </div>
  );
};
