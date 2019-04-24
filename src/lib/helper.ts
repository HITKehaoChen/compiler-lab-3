export const once = (emitter: any, name: any) => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const eventListener = (...args) => {
      // @ts-ignore
      if (errorListener !== undefined) {
        // @ts-ignore
        emitter.removeListener("error", errorListener);
      }
      resolve(args);
    };
    // @ts-ignore
    let errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== "error") {
      errorListener = (err: Error) => {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once("error", errorListener);
    }

    emitter.once(name, eventListener);
  });
};
