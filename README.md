# microcms-iframe-sdk

This repository contains libraries for create [iframe field application](https://document.microcms.io/manual/iframe-field).

This repository managed as monorepo by [`turborepo`](https://turborepo.org/docs/getting-started).

## Directory structure

- [`microcms-iframe-api`](./packages/api/): This library do not depend framework (eg React, Vue.js ...)
- [`microcms-iframe-react`](./packages/react/): This library is useful when using React
- [`microcms-cra-template`](./packages/cra-template/): This directory is template for [`create-react-app`](https://create-react-app.dev/)
- [`examples/react`](./examples/react/): React example
- [`examples/nextjs`](./examples/nextjs/): Next.js example
