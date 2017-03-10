((function (App) {
  App.Helper.Responsive = {
    isMobile: window.innerWidth <= 375,
    isTablet: window.innerWidth > 375 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  };
})(this.App));
