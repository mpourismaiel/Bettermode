import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "./pages/App.tsx";
import { client } from "./utils/apollo.ts";
import { GlobalLayout } from "./layouts/global.tsx";

import "./index.css";
import { Post } from "./pages/Post.tsx";

dayjs.extend(relativeTime);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GlobalLayout />}>
            <Route index element={<App />} />
            <Route path="/post/:slugAndId" element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
