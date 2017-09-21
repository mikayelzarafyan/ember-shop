import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr(),
    qty: DS.attr(),
    price: DS.attr(),
    shop: DS.belongsTo('shop')
});
