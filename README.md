# taggable-ui
An effortless &amp; intuitive UI for the taggable (tagging) service. (React, Redux &amp; GraphQL)

## Authentication

To access the Editor, users will need an account with AUTH0 with the correct permissions enabled (permission to view taggy)

## Running locally

After running `npm install`, in your terminal type

`npm run dev:serve`
Then point your browser to `localhost:8080`.

## Bundling

Webpack and Babel are used to transpile and bundle the code. There are two webpack configs, one for development and one for production. 'webpack.production.config' is used to create the public bundle which is deployed to s3.

## Deployment to s3.

A gulp script ('gulpfile.js') is used to deploy the app to the `www.tcdl.io` s3 bucket in the folder at the path `utils/graphiql/`.

To deploy to production run the command:

```
npm run deploy -- --env CI
```
or to deploy to ci, run the command:

```
npm run deploy -- --env PROD
```

## Viewing the Taggable System Editor

CI: [https://www.tcdl.io/utils/graphiql/index.html](www.tcdl.io/isearch/utils/graphiql)

PROD: [https://www.tcdl.io/utils/graphiql/prod/index.html](www.tcdl.io/isearch/utils/graphiql/prod)
