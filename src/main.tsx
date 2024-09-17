import { ApolloProvider } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import { GlobalLayout } from "./layouts/global";
import { App } from "./pages/App";
import { Docs } from "./pages/Docs";
import { Post } from "./pages/Post";
import { client } from "./utils/apollo";

dayjs.extend(relativeTime);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GlobalLayout />}>
            <Route index element={<App />} />
            <Route path="/post">
              <Route path="/post/:slugAndId" element={<Post />} />
            </Route>
            <Route path="/docs" element={<Docs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
