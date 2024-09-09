import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import App from "./pages/App.tsx";
import { client } from "./utils/apollo.ts";
import { GlobalLayout } from "./layouts/global.tsx";

import "./index.css";

dayjs.extend(relativeTime);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <GlobalLayout>
        <App />
      </GlobalLayout>
    </ApolloProvider>
  </StrictMode>,
);
