// Api Versions
const v1 = 'v1';

// Root
const authRoot = 'auth';
const userRoot = 'user';

export const routesV1 = {
  version: v1,
  auth: {
    root: authRoot,
    login: `/${authRoot}/login`,
    register: `/${authRoot}/register`,
  },
  user: {
    root: userRoot,
    create: `/${userRoot}/create`,
    delete: `/${userRoot}/:id`,
    list: `/${userRoot}/list`,
  },
};
