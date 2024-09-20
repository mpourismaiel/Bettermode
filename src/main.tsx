import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Route, Routes } from "react-router-dom";

import "./index.css";

import { GlobalLayout } from "./layouts/global";
import { App } from "./pages/App";
import { Docs } from "./pages/Docs";
import { Post } from "./pages/Post";

dayjs.extend(relativeTime);

export const Root = () => (
  <Routes>
    <Route path="/" element={<GlobalLayout />}>
      <Route index element={<App />} />
      <Route path="/post">
        <Route path="/post/:slugAndId" element={<Post />} />
      </Route>
      <Route path="/docs" element={<Docs />} />
    </Route>
  </Routes>
);
