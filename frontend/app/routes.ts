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
  route("dashboard", "routes/dashboard.tsx"),
  route(":user/settings", "routes/settings.tsx"),
  route("files", "routes/files.tsx"),
] satisfies RouteConfig;
