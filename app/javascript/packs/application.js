import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus/webpack-helpers"

// Start the Stimulus application
const application = Application.start()

// Import all controller definitions from the '../controllers' directory
const context = require.context("../controllers", true, /\.js$/)

// Load controller definitions into the application
application.load(definitionsFromContext(context))
