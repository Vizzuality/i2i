// This is a manifest file that'll be compiled into application.js,
// which will include all the files listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts,
// vendor/assets/javascripts, or any plugin's vendor/assets/javascripts directory
// can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require underscore
//= require backbone
//= require backbone_rails_sync
//= require backbone_datalink
//= require_self
//= require helpers/accessibility
//= require templates/shared/modal
//= require templates/shared/modals/modal-team
//= require templates/shared/social-tooltip
//= require components/shared/tooltip
//= require components/shared/modal
//= require components/shared/modals/modal-team
//= require views/shared/mobile-menu
//= require views/shared/social-tooltip
//= require views/shared/footer
//= require_tree ./pages/static_pages
//= require routers/application
//= require ckeditor/init


(function () {
  this.App = {
    Core: {},
    Model: {},
    Collection: {},
    Page: {},
    View: {},
    Component: {},
    Router: {},
    Helper: {}
  };
}).call(this);
