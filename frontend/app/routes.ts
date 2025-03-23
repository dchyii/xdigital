import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signup", "routes/signup.tsx"),
  route("log in", "routes/login.tsx"),

  ...prefix(":user", [
    index("routes/settings.tsx"),
    route(":user/dashboard", "routes/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
