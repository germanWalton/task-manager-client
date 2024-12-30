export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TASKS: "/tasks",
};

export const PRIVATE_ROUTES = [ROUTES.HOME, ROUTES.TASKS];

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
