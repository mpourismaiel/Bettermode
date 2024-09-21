import { useCallback, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Alert } from "../components/ui/Alert";
import { Placeholder } from "../components/ui/Placeholder";
import { cn } from "../utils/string";

export const Docs = () => {
  const [loading, setLoading] = useState(true);
  const [documentation, setDocumentation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDocs = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/readme", {
        method: "GET",
        headers: {
          "Content-Type": "text/markdown",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch documentation");
      }

      const data = await response.text();
      setDocumentation(
        `> This is the documentation for the project. It is fetched from the README.md file in the root of the project.\n\n${data}`,
      );
    } catch (error) {
      setError((error as Error)?.message ?? error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <>
      {loading ? (
        <Placeholder className="w-full h-[200px]" />
      ) : error ? (
        <Alert>{error}</Alert>
      ) : !documentation ? (
        <Alert>No documentation found</Alert>
      ) : (
        <div className="flex flex-col rounded-lg bg-surface-1 p-6 shadow-xl">
          <div
            className={cn(
              "prose max-w-full text-foreground-1",
              "prose-a:text-blue-500 prose-headings:text-foreground-1 prose-code:text-orange-500",
              "prose-blockquote:py-1 prose-blockquote:rounded prose-blockquote:text-base prose-blockquote:bg-surface-3 prose-blockquote:border-s-orange-500 prose-blockquote:text-foreground-3",
            )}
          >
            <Markdown remarkPlugins={[remarkGfm]}>{documentation}</Markdown>
          </div>
        </div>
      )}
    </>
  );
};
