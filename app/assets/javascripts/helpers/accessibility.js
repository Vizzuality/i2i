App.Helper.Accessibility = {
  /**
   * Return the list of focusable elements
   * @return {string}
   */
  getFocusableElements: function () {
    return 'a[href], area[href], input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), button:not([disabled]):not([hidden]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  }
};
