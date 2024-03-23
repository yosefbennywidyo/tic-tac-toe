import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // Check if flash message exists
    const flashMessage = document.querySelector('.alert');
    if (flashMessage) {
      // Create new Bootstrap toast
      var toast = new bootstrap.Toast(flashMessage);
      // Show the toast
      toast.show();
    }
  }
}
