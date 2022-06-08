const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		return res.render('products', {products: products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		let detailProduct = products.filter (item => {
			return item.id == req.params.id
		})

		
		return res.render('detail', {detailProduct: detailProduct})

	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {

		const newProduct = {
			id: products [products.length -1].id + 1,
			name: req.body.name,
			price: req.body.price,
			discount:req.body.discount,
			category: req.body.category,
			description:req.body.description,
			image: "imagen"
		}
	 products.push ( newProduct)

	let newProductStore = JSON.stringify(products, null, 2);

	fs.writeFileSync(productsFilePath, newProductStore, 'utf-8')	

		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {

		let editProduct = products.filter(item => {
			return item.id == req.params.id
		})
		
		res.render ('product-edit-form', {editProduct: editProduct})
	},
	// Update - Method to update
	update: (req, res) => {

		res.send(req.body)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;