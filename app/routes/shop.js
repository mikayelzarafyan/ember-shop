import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.store.findRecord('shop', params.shop_id);
	}
});
