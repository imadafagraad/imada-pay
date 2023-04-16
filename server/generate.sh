#!/bin/bash

(
  echo "Generating REST API routes..."
  npx tsoa spec-and-routes
) &

(
  echo "Generating mobilepay TS clients..."
  npx openapi-typescript-codegen -i src/mobilepay/openapi/subscriptions.yaml -o generated/mobilepay --name MobilepaySubscriptionClient --useOptions
)
