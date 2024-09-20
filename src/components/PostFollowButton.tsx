import { useMutation } from "@apollo/client/react/hooks";
import { BellIcon, BellRingIcon, Loader2Icon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Button } from "./Button";

import POST_SUBSCRIBE from "../queries/post-subscribe.gql";
import POST_UNSUBSCRIBE from "../queries/post-unsubscribe.gql";

import { cn } from "../utils/string";

export const PostFollowButton = ({ post }: { post: any }) => {
  const [subscribed, setSubscribed] = useState(post.authMemberProps.subscribed);

  const [subscribe, { loading: subscribeLoading, error: subscribeError }] =
    useMutation(POST_SUBSCRIBE);
  const [
    unsubscribe,
    { loading: unsubscribeLoading, error: unsubscribeError },
  ] = useMutation(POST_UNSUBSCRIBE);

  const loading = useMemo(
    () => subscribeLoading || unsubscribeLoading,
    [subscribeLoading, unsubscribeLoading],
  );

  const error = useMemo(
    () => subscribeError || unsubscribeError,
    [subscribeError, unsubscribeError],
  );

  const toggleSubscription = useCallback(async () => {
    if (subscribed) {
      await unsubscribe({ variables: { publisherId: post.id } });
      setSubscribed(false);
    } else {
      await subscribe({ variables: { publisherId: post.id } });
      setSubscribed(true);
    }
  }, [subscribed, post.id, subscribe, unsubscribe]);

  return (
    <Button
      className={cn({
        "animate-pulse": loading,
      })}
      variant={subscribed ? "primary" : "secondary"}
      size="default"
      disabled={loading}
      onClick={toggleSubscription}
    >
      {subscribed ? (
        <>
          {loading ? (
            <Loader2Icon className="me-2 h-4 w-4 animate-spin" />
          ) : (
            <BellRingIcon className="me-2 h-4 w-4" />
          )}
          <span className="hidden sm:flex">Followed</span>
        </>
      ) : (
        <>
          {loading ? (
            <Loader2Icon className="me-2 h-4 w-4 animate-spin" />
          ) : (
            <BellIcon className="me-2 h-4 w-4" />
          )}
          <span className="hidden sm:flex">Follow</span>
        </>
      )}
    </Button>
  );
};
