const loggerMiddleware = (store) => (next) => (action) => {
  if (action.type.startsWith("auth/")) {
    console.group(action.type);
    console.log("Prev State:", store.getState());
    console.log("Action:", action);
    console.log("Payload:", action.payload);

    const result = next(action); // Call next and store the result

    console.log("Next State:", store.getState());
    console.groupEnd();

    return result; // Return the result to continue the chain
  } else {
    return next(action);
  }
};

export default loggerMiddleware;
