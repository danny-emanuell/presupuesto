'use strict';

(function () {
	var app = angular.module('presupuesto', ['LocalStorageModule']);

	app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix('ls');
	}]);

	app.controller('mainCtrl', function ($scope, localStorageService) {
		var todosIngresos = localStorageService.get('ingresos');
		$scope.ingresos = todosIngresos || [];

		$scope.$watch('ingresos', function () {
			localStorageService.set('ingresos', $scope.ingresos);
		}, true);

		$scope.addIngreso = function (ingreso) {

			$scope.ingresos.push({
				_id: generador($scope.ingresos.length),
				description: $scope.ingreso.description,
				monto: $scope.ingreso.monto
			});

			$scope.ingreso = "";
		};

		$scope.removeIngreso = function (index) {
			$scope.ingresos.splice(index, 1);
		};

		$scope.sumaIngresos = function () {
			var resultado = 0;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = $scope.ingresos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var ingreso = _step.value;

					resultado += parseInt(ingreso.monto);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return resultado;
		};

		function generador(len) {

			var id = 0;

			if (len > 0) {
				id = $scope.ingresos.length - 1;

				return id + 1;
			} else {

				return id;
			}
		}

		var todosEngresos = localStorageService.get('egresos');
		$scope.egresos = todosEngresos || [];

		$scope.$watch('egresos', function () {
			localStorageService.set('egresos', $scope.egresos);
		}, true);

		$scope.addCategory = function () {

			if ($scope.newcategory) {
				$scope.egresos.push({ show: false, category: $scope.newcategory, items: [], total: 0 });
			}
			$scope.newcategory = "";
		};

		$scope.selectedCategory = $scope.egresos[0];

		$scope.addEgresos = function () {

			$scope.selectedCategory.show = true;
			$scope.selectedCategory.total += parseFloat($scope.montoegreso);
			$scope.selectedCategory.items.push({ _id: generadorid($scope.selectedCategory), description: $scope.newegreso, monto: $scope.montoegreso });
			$scope.newegreso = "";
			$scope.montoegreso = "";
		};

		$scope.delEgreso = function (category, index) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = category.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var i = _step2.value;

					if (i._id == index) {
						category.items.splice(category.items.indexOf(i), 1);
						category.total -= i.monto;
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			if (category.items.length < 1) {
				category.total = 0;
			}

			ocultarCategoria();
		};

		$scope.sumaEgresos = function () {
			var resultado = 0;
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = $scope.egresos[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var egreso = _step3.value;

					resultado += parseInt(egreso.total);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return resultado;
		};

		$scope.totales = function (ingreso, egreso) {

			ingreso = $scope.sumaIngresos() || 0;
			egreso = $scope.sumaEgresos() || 0;

			return ingreso - egreso;
		};

		function generadorid(category) {
			if (category.items.length < 1) {
				return 0;
			} else {
				return category.items.length - 1 + 1;
			}
		}

		function ocultarCategoria() {
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {

				for (var _iterator4 = $scope.egresos[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var egres = _step4.value;

					if (egres.items.length < 1) {
						egres.show = false;
					}
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		}
	});
})();