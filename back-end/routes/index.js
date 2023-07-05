import router from "./routes.js";

const routes = (app) => {
  app.use("/", router);
};

export default routes;
