'use strict';

import fetch from 'isomorphic-fetch';
import configure from 'con.figure';
import configuration from '../../config';

const config = configure(configuration);

/**
* Express-graphql accepts request with the parameters
* @{query} - A valid GraphQL query or mutation
* @{variables} - runtime values to use for any GraphQL query variables as a JSON object
* Need to specify the content-type as 'application/json' in the request header.
**/

export function query (query, variables) {
  return fetch(config.graphqlUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('userToken')
    },
    body: JSON.stringify({ 'query': query, 'variables': JSON.stringify(variables) })
  })
  .then(res => res.json());
}
