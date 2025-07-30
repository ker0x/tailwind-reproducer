import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ['dialog', 'dynamicContent'];

    connect() {
        if (this.hasDynamicContentTarget) {
            // when the content changes, call this.open()
            this.observer = new MutationObserver(() => {
                const shouldOpen = this.dynamicContentTarget.innerHTML.trim().length > 0;

                if (shouldOpen && !this.dialogTarget.open) {
                    this.open();
                } else if (!shouldOpen && this.dialogTarget.open) {
                    this.close();
                }
            });

            this.observer.observe(this.dynamicContentTarget, {
                childList: true,
                characterData: true,
                subtree: true,
            });
        }
    }

    disconnect() {
        if (this.observer !== undefined) {
            this.observer?.disconnect();
        }

        if (this.dialogTarget.open) {
            this.close();
        }
    }

    open(event) {
        this.element.show();
    }

    close(event) {
        this.element.hide();
    }
}
