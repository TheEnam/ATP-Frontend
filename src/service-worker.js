/* eslint-disable no-restricted-globals */
import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

clientsClaim();
self.skipWaiting();


// Precache the app shell (CRA injects the manifest here automatically)
precacheAndRoute(self.__WB_MANIFEST);

// Cache your API announcements — NetworkFirst means it tries the network,
// falls back to cache if offline
registerRoute(
  ({ url }) => url.pathname.includes("/api/announcements"),
  new NetworkFirst({
    cacheName: "announcements-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // keep for 7 days
      }),
    ],
  })
);

// Cache display order too
registerRoute(
  ({ url }) => url.pathname.includes("/api/display-order"),
  new NetworkFirst({
    cacheName: "display-order-cache",
    plugins: [
      new ExpirationPlugin({ maxEntries: 5, maxAgeSeconds: 7 * 24 * 60 * 60 }),
    ],
  })
);

// Cache static assets (fonts, icons etc.) with StaleWhileRevalidate
registerRoute(
  ({ request }) => request.destination === "style" || request.destination === "script" || request.destination === "image",
  new StaleWhileRevalidate({ cacheName: "static-assets-cache" })
);