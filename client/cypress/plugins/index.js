/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const injectDevServer = require('@cypress/react/plugins/react-scripts')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  if (config.env.ci) config.baseUrl = 'http://localhost:4000'
  injectDevServer(on, config)

  return config
}
