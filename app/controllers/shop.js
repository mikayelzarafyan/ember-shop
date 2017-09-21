import Ember from 'ember';

export default Ember.Controller.extend({

	totalShopSum: Ember.computed('model.products.@each.qty', function(){
		let products = this.get('model.products'),
		sum = 0;

		products.forEach(product => {
			sum += parseInt(product.get('qty')) * parseInt(product.get('price'));
		});

		return sum;
	}),

	actions: {
		createProduct(){

            let title = this.get('title'),
				qty = this.get('qty'),
				price = this.get('price');

            if(title){

				var newProduct = this.store.createRecord('product', {
					title: title,
					qty: qty,
					price: price
				});

				// Get the parent shop
				var shop = this.store.peekRecord('shop', this.model.id);
				shop.get('products').addObject(newProduct);

				// Save the product, then save the shop
				newProduct.save().then(function() {
					return shop.save();
				});

				this.set('title', '');
				this.set('qty', '');
				this.set('price', '');

            }
        },
        deleteProduct(id){
			var shop = this.store.peekRecord('shop', this.model.id);
            this.store.findRecord('product', id, { backgroundReload: false }).then(function(product) {
                product.destroyRecord().then(function() {
					shop.save();
				});
            });
        },
        updateProduct(id){
            let product = this.store.peekRecord('product', id);
            product.set('title', this.get('updateTitle'));
            product.set('qty', this.get('updateQty'));
            product.set('price', this.get('updatePrice'));
            product.save();
            this.toggleProperty('showEditProduct');
        },
        editProduct(id){
			let product = this.store.peekRecord('product', id);
			this.set('showEditProduct', id);
			this.set('updateTitle', product.get('title'));
			this.set('updateQty', product.get('qty'));
			this.set('updatePrice', product.get('price'));
		}
	}
});