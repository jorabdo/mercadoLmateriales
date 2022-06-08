const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// hacer un filtro por in-sale y otro por visited (dividir la variable) .filter
		let productsVisited = products.filter (item => {
			return item.category == 'visited'
		})

		let productsInsale = products.filter (item => {
			return item.category == 'in-sale'
		})

		res.render ('index', {productsVisited: productsVisited, productsInsale: productsInsale})
		
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
