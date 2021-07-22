/* eslint @typescript-eslint/ban-ts-ignore: off */
// This is here for historical reasons
// We used to have a service worker
// Any future customer that loads our site
// will need to have that worker unregistered
// Jay ran into this caching issue
// Commit that caused the bug that this fixes can be found below:
// https://github.com/rent-feather/feather-website/commit/a02b150d14773379b6d556c1bac3a85e3c794272
function unregister() {
  navigator.serviceWorker.getRegistrations().then((registrations) =>
    Promise.all(
      registrations.map((registration) => {
        registration
          .unregister()
          .then(function () {
            // @ts-ignore
            return self.clients.matchAll();
          })
          .then((clients) => {
            // TODO: Fix this the next time the file is edited.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            clients.forEach((client: any) => {
              if (client.url && "navigate" in client) {
                client.navigate(client.url);
              }
            });
          });
      })
    )
  );
}

// Check our browser supports service workers
if ("serviceWorker" in navigator) {
  unregister();
}
