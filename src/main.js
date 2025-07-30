import './style.css'

import { Application } from "@hotwired/stimulus"

import DialogController from "./controllers/dialog-controller.js"

window.Stimulus = Application.start()
Stimulus.register("dialog", DialogController)
