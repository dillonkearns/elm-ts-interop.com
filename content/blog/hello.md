---
{
  "type": "blog",
  "author": "Dillon Kearns",
  "title": "Hello `elm-pages`! 🚀",
  "description": "Here's an intro for my blog post to get you interested in reading more...",
  "image": "images/article-covers/hello.jpg",
  "published": "2019-09-21",
}
---

```typescript
let app = Elm.Main.init({
  flags: {
    first: "Dillon",
    last: "",
    severity: "error",
  },
});

app.ports.fromElm.subscribe((fromElm) => {
  switch (fromElm.tag) {
    case "alert":
      app.ports.toElm.send([null, 1, 3, "", null]);
      break;
    case "bugsnag":
      fromElm.context;
      break;
    case "sendPresenceHeartbeat":
      break;
    default:
      assertUnreachable(fromElm);
  }
});

function assertUnreachable(arg: never): never {
  throw "Unreachable.";
}

// generated code below
type FromElm =
  | { tag: "alert"; message: string }
  | { tag: "bugsnag"; context: string[]; message: string }
  | { tag: "sendPresenceHeartbeat" };

type Flags = {
  severity: "info" | "warning" | "error";
  first: string;
  last: string;
};

type ToElm = [unknown, number, ...unknown[]] &
  [unknown, unknown, unknown, string, ...unknown[]];

interface ElmApp {
  ports: {
    fromElm: { subscribe(callback: (fromElm: FromElm) => void): void };
    toElm: { send(data: ToElm): void };
  };
}

declare const Elm: {
  Main: { init(options: { node?: HTMLElement | null; flags: Flags }): ElmApp };
};
```
