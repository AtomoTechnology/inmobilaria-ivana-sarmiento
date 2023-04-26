const { Contract, Eventuality, Property } = require("../../models");

const {
	all,
	paginate,
	create,
	findOne,
	update,
	destroy,
} = require("../Generic/FactoryGeneric");

exports.GetAll = all(Eventuality, {
	include: [
		{
			model: Property,
			attributes: ["street", "number", "floor", "dept", "id"],
			// include: {
			// 	model: Contract,
			// 	attributes: ["startDate", "endDate", "id", "state"],
			// },
		},
	],
});
exports.Paginate = paginate(Eventuality, {
	// include: [{ model: Contract }],
});
exports.Create = create(Eventuality, [
	// "ContractId",
	"PropertyId",
	"amount",
	"description",
	"expiredDate",
	"clientAmount",
	"ownerAmount",
]);
exports.GetById = findOne(Eventuality, {
	// include: [{ model: Contract }],
});
exports.Put = update(Eventuality, [
	// "ContractId",
	"PropertyId",
	"amount",
	"description",
	"expiredDate",
	"clientAmount",
	"ownerAmount",
]);
exports.Destroy = destroy(Eventuality);
