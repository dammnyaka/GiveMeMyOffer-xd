// ---------// HH // ----------//

const obj = { text: "my text" };
const block = document.querySelector(".vacancy-serp-content");
const item = block.querySelectorAll(".serp-item");
const but = block.querySelectorAll("a.bloko-button_scale-small");

const navBlock = document.querySelector(".bloko-gap.bloko-gap_top");
const nextPage = navBlock.querySelectorAll("a.bloko-button");

// const form = document.querySelector("form#RESPONSE_MODAL_FORM_ID");

const clickButton = async (button) => {
  return new Promise((resolve) => {
    let modalTimer = setTimeout(() => {
      button.click();
      resolve();
    }, 3000);

    const modalCheckInterval = setInterval(() => {
      const modal = document.querySelector(".bloko-modal");
      if (modal) {
        clearTimeout(modalTimer);
        clearInterval(modalCheckInterval);

        const textArea = modal.querySelector(".bloko-textarea.bloko-textarea_noresize");
        const butModal = modal.querySelector(".bloko-button.bloko-button_kind-primary");

        callSimulateInput(textArea, obj.text, butModal).then(() => {
          button.click();
          resolve();
        });
      }
    }, 100);

    // if (form) {
    //   clearTimeout(modalTimer);
    //   clearInterval(modalCheckInterval);
    //   window.history.back()
    //   return;
    // }
  });
};

const processButtons = async () => {
  const minDelay = 2000;
  const maxDelay = 3000;
  for (const [index, button] of but.entries()) {
    const delay = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);

    await new Promise((resolve) => setTimeout(resolve, delay));

    const currentItem = item[index];
    currentItem.scrollIntoView({ behavior: "smooth" });

    // if (form) {
    //   return;
    // }

    await clickButton(button);

    if (index === but.length - 1) {
      nextPage[5].click();
    }
    console.log(delay);
  }
};

const simulateInput = (textArea, text, butModal) => {
  return new Promise((resolve) => {
    const inputEvent = new Event("input", { bubbles: true });

    Object.defineProperty(inputEvent, "target", {
      value: textArea,
      enumerable: true,
    });

    const originalDescriptor = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value");

    Object.defineProperty(textArea, "value", {
      configurable: true,
      enumerable: originalDescriptor.enumerable,
      get() {
        return originalDescriptor.get.call(this);
      },
      set: (v) => {
        originalDescriptor.set.call(this, v);
        this.dispatchEvent(inputEvent);
      },
    });

    textArea.value = text;
    butModal.click();
    resolve();
  });
};

const callSimulateInput = async (textArea, text, butModal) => {
  await simulateInput(textArea, text, butModal);
};

if (block) {
  processButtons();
}
