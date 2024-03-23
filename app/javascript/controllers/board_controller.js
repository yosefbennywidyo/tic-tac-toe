import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  updateContent(event) {
    console.log("Frame ID:", this.element.dataset.frameId);
    const frame = document.getElementById(this.element.dataset.frameId);
    const currentPlayer = event.target.dataset.currentPlayer;
    const position = event.target.dataset.position;
    console.log("Frame Element:", frame);
    frame.dataset.currentPlayer = currentPlayer;
    console.log("Box clicked:", position);
    frame.dataset.position = position;
  }
}

