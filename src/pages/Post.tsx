import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { Post as PostComponent } from "../components/Post";

import GET_POST from "../queries/get-post.gql";
import { Placeholder } from "../components/Placeholder";

export const Post = () => {
  const { slugAndId } = useParams();
  const id = slugAndId?.split("-").pop();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });

  if (error) return <p>Error : {error.message}</p>;

  console.log(data);

  return (
    <div className="col-span-9">
      {loading ? (
        <Placeholder className="h-[200px] w-full" />
      ) : (
        <PostComponent post={data.post} />
      )}
    </div>
  );
};
