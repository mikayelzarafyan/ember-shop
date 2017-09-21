import Ember from 'ember';

export default Ember.Controller.extend({
  	actions: {
	    toggleBody() {
	      this.toggleProperty('isShowingBody');
	    },
	    createShop(){
            let name = this.get('name');

            if(name){
                let shop = this.store.createRecord('shop', {
                    name: name
                });
                shop.save();
            }

            this.set('name', '');
        },
        editShop(id){
            let shop = this.store.peekRecord('shop', id);
            this.set('showEditShop', id);
            this.set('updateName', shop.get('name'));
        },
        updateShop(id){
            let shop = this.store.peekRecord('shop', id);
            shop.set('name', this.get('updateName'));
            shop.save();
            this.toggleProperty('showEditShop');
        },
        deleteShop(id){

            var shop = this.store.peekRecord('shop', id),
                deletions = shop.get('products').map(function(product) {
                return product.destroyRecord();
            });

            // Ensures all products are deleted before the shop
            Ember.RSVP.all(deletions)
                .then(function() {
                    return shop.destroyRecord();
                })
                .catch(function(e) {
                // Handle errors
                });
        }
  	}
});