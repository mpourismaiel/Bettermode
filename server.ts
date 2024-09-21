import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";
import { createHttpLink } from "@apollo/client/link/http";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import cookieParser from "cookie-parser";
import express, { RequestHandler } from "express";
import fs from "node:fs/promises";
import { loadEnv } from "vite";

import { typePolicies } from "./src/utils/apollo-type-policies";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const env = loadEnv(isProduction ? "prod" : "dev", "");
const LOGIN_GUEST = await fs.readFile("./src/queries/login-guest.gql", "utf-8");

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();
app.use(cookieParser() as RequestHandler);

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression() as RequestHandler);
  app.use("/", sirv("./dist/client", { extensions: [] }));
}

app.use("/assets", express.static("./src/assets"));

app.use("/readme", express.static("./README.md"));

// Serve HTML
app.use("*", async (req, res) => {
  try {
    let template;
    let render;
    if (!isProduction) {
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(req.originalUrl, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    let token = req.cookies?.bettermode_access_token ?? "";
    try {
      if (!token) {
        const response = await fetch(env.VITE_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operationName: "LoginGuest",
            query: LOGIN_GUEST,
            variables: { networkDomain: env.VITE_NETWORK_DOMAIN },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        if (data.errors) {
          throw new Error(JSON.stringify(data.errors));
        }

        token = data.data.tokens.accessToken;
      }
    } catch (error) {
      console.error(error);
    }

    const client = new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache({
        typePolicies,
      }),
      link: createHttpLink({
        uri: "https://api.bettermode.com/",
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      }),
    });

    const content = await renderToStringWithData(
      render(
        {
          path: req.originalUrl,
          token,
          client,
        },
        ssrManifest,
      ),
    );

    const html = template
      .replace(`<!--app-html-->`, content ?? "")
      .replace(
        `<!--app-script-->`,
        `<script>window.__APOLLO_STATE__=${JSON.stringify(client.extract()).replace(/</g, "\\u003c")}</script>`,
      );

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
