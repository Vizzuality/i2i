(function (App) {
    
      App.View.SearchFiltersModal = App.Component.Modal.extend({
    
        defaults: {
            // See App.Component.Modal for details about this option
            title: 'Select tags',
            // See App.Component.Modal for details about this option
            showTitle: true,
            // See App.Component.Modal for details about this option
            footer: '<button class="c-button -white -outline -medium js-cancel">Cancel</button><button type="submit" class="c-button -white -medium js-done">Done</button>',
            // Callback executed when the user presses the "Done" button
            // The callback gets passed the name of the selected chart,
            tags: gon.tags || [],
            isForm: true,
            form: {
                action: '/search',
                id: 'tag-filters',
                classes: 'c-modal-tag-filters'
            }
        },
    
        events: function () {
          return _.extend({}, App.Component.Modal.prototype.events, {
            'click .js-cancel': 'onCloseModal',
            'click .js-done': '_onSubmit'
          });
        },
    
        contentTemplate: JST['templates/shared/modals/modal-search-filters'],
    
        initialize: function (options) {
            this.constructor.__super__.initialize.call(this, options);            
            this.render();
        },
    
        /**
         * Event handler executed when the user closes the modal
         */
        onCloseModal: function () {
          App.Component.Modal.prototype.onCloseModal.apply(this, arguments);
        },

        /**
         * Event handler executed when the user submits the modal
         */
        _onSubmit: function (event) {
            event.preventDefault();
            var form = this.$el.find('#tag-filters');
            var checked = form.find('input:checked')
                .map(function(){
                    return $(this).val()
                })
                .get();
            
            Backbone.Events.trigger('search:update', {tag_term: checked});

            App.Component.Modal.prototype.onCloseModal.apply(this);
        },
    
        render: function () {
            this.options.content = this.contentTemplate({
                tags: this.options.tags,
                selectedTags: this.options.selectedTags,
                footer: this.options.footer
            });
            this.constructor.__super__.render.apply(this);
        }
    
      });
    }.call(this, this.App));
    