(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.svg {\n  max-width: 100px;\n  max-height: 100px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uc3ZnIHtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbiAgbWF4LWhlaWdodDogMTAwcHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-lamination-builder></app-lamination-builder>\n\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.svgSource = "\n<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\n  <circle cx=\"50\" cy=\"50\" r=\"50\"/>\n</svg>\n  ";
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _lamination_builder_lamination_builder_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lamination-builder/lamination-builder.component */ "./src/app/lamination-builder/lamination-builder.component.ts");
/* harmony import */ var _lamination_viewer_lamination_viewer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lamination-viewer/lamination-viewer.component */ "./src/app/lamination-viewer/lamination-viewer.component.ts");








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _lamination_builder_lamination_builder_component__WEBPACK_IMPORTED_MODULE_6__["LaminationBuilderComponent"],
                _lamination_viewer_lamination_viewer_component__WEBPACK_IMPORTED_MODULE_7__["LaminationViewerComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/example-laminations.ts":
/*!****************************************!*\
  !*** ./src/app/example-laminations.ts ***!
  \****************************************/
/*! exports provided: parseLaminationDefinition, pullbackObservable, rabbitLamination, rabbitLamination_ternary, ternarySymmetricLamination, criticalTriangleGap_ternary, criticalTriangleGapIRT_ternary, irq_fat_quaternary, irq_thin_quaternary, never_close_quintary, never_close_quintary_def, template */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseLaminationDefinition", function() { return parseLaminationDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pullbackObservable", function() { return pullbackObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rabbitLamination", function() { return rabbitLamination; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rabbitLamination_ternary", function() { return rabbitLamination_ternary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ternarySymmetricLamination", function() { return ternarySymmetricLamination; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "criticalTriangleGap_ternary", function() { return criticalTriangleGap_ternary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "criticalTriangleGapIRT_ternary", function() { return criticalTriangleGapIRT_ternary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "irq_fat_quaternary", function() { return irq_fat_quaternary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "irq_thin_quaternary", function() { return irq_thin_quaternary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "never_close_quintary", function() { return never_close_quintary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "never_close_quintary_def", function() { return never_close_quintary_def; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "template", function() { return template; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var laminations_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! laminations-lib */ "./node_modules/laminations-lib/dist/index.js");
/* harmony import */ var laminations_lib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(laminations_lib__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var binary = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["NaryFraction"].parseFactory(2);
var ternary = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["NaryFraction"].parseFactory(3);
var quaternary = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["NaryFraction"].parseFactory(4);
var quintary = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["NaryFraction"].parseFactory(5);
var parseLaminationDefinition = function (def) {
    var base = def.base;
    var parsePoint = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["NaryFraction"].parseFactory(base);
    var leaves = def.leaves.map(function (poly) { return laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new(poly.points.map(parsePoint)); });
    var branchSpecs = def.branches.map(function (branchDef) {
        var chordPoints = branchDef.chord.map(parsePoint);
        var chord = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(chordPoints[0], chordPoints[1]);
        var endpoints = branchDef.endpoints.map(parsePoint);
        return laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"].apply(void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"]([chord], endpoints));
    });
    return {
        base: base,
        leaves: leaves,
        branchSpecs: branchSpecs,
        name: def.name || 'lamination',
    };
};
var pullbackObservable = function (_a) {
    var leaves = _a.leaves, branchSpecs = _a.branchSpecs, base = _a.base;
    var branches = Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBuilder"])(base)(branchSpecs);
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["PullbackLamination"].iterates(leaves, branches))
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (lamination) { return ({
        lamination: lamination,
        criticalChords: branchSpecs.map(function (spec) { return spec.chord; }),
    }); }));
};
var rabbitLamination = function () {
    var criticalChord = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(binary('_001'), // 1/7
    binary('1_010') // 9/14
    );
    var branchSpecs = [
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(criticalChord, criticalChord.lower)
    ];
    var startingTriangle = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
        binary('_001'),
        binary('_010'),
        binary('_100'),
    ]);
    return { leaves: [startingTriangle], branchSpecs: branchSpecs, base: 2, name: "Rabbit" };
};
var rabbitLamination_ternary = function () {
    var pointA = ternary('_001');
    var pointB = ternary('1_010');
    var pointC = ternary('2_010');
    var criticalA = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointA, pointB);
    var criticalB = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointB, pointC);
    var criticalC = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointC, pointA);
    var branchSpecs = [
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(criticalA, pointA),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(criticalB, pointB),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(criticalC, pointC)
    ];
    var startingTriangle = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
        ternary('_001'),
        ternary('_010'),
        ternary('_100'),
    ]);
    return { leaves: [startingTriangle], branchSpecs: branchSpecs, base: 3, name: "Rabbit (ternary)" };
};
var ternarySymmetricLamination = function () {
    var criticalA = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(ternary('_01'), // 1/8
    ternary('2_10') // 19/24
    );
    var criticalB = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(ternary('0_21'), // 7/24
    ternary('_12') // 5/8
    );
    var branchSpecs = [
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(criticalA, criticalA.lower),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(criticalB, criticalB.upper),
    ];
    var leaves = [
        laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(ternary('_01'), // 1/8
        ternary('_21') // 7/8
        ),
        laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(ternary('_10'), // 3/8
        ternary('_12') // 5/8
        )
    ].map(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].fromChord);
    return { leaves: leaves, branchSpecs: branchSpecs, base: 3, name: "Temple" };
};
var criticalTriangleGap_ternary = function () {
    var pointA = ternary('_002');
    var pointB = ternary('1_020');
    var pointC = ternary('2_020');
    var branchSpecs = [
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointA, pointB), pointA),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointB, pointC), pointB),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointC, pointA), pointC),
    ];
    var leaves = [
        laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(ternary('_011'), ternary('_020')),
        laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(ternary('_002'), ternary('_101')),
        laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(ternary('_110'), ternary('_200')),
    ].map(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].fromChord);
    return { leaves: leaves, branchSpecs: branchSpecs, base: 3, name: "Critical Triangle with Gap" };
};
var criticalTriangleGapIRT_ternary = function () {
    var pointA = ternary('_002');
    var pointB = ternary('_101');
    var pointC = ternary('2_011');
    var pointD = ternary('2_020');
    var criticalA = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointA, pointD);
    var criticalB = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointB, pointC);
    var branchSpecs = [
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(criticalA, pointD),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(criticalB, pointC),
    ];
    var leaves = [
        laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
            pointA,
            pointB,
            ternary('_201')
        ]),
        laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
            ternary('_011'),
            ternary('_020'),
            ternary('_012')
        ]),
        laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
            ternary('_110'),
            ternary('_200'),
            ternary('_120')
        ])
    ];
    return { leaves: leaves, branchSpecs: branchSpecs, base: 3, name: "Critical Identity Return Triangle" };
};
var irq_fat_quaternary = function () {
    var pointA = quaternary('0_233');
    var pointB = quaternary('_030');
    var pointC = quaternary('1_300');
    var pointD = quaternary('1_302');
    var pointE = quaternary('_230');
    var pointF = quaternary('_323');
    var branchSpecs = [
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointA, pointF), pointA),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointB, pointC), pointC),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointD, pointE), pointD),
    ];
    var middleSquare = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
        pointB,
        quaternary('_130'),
        pointE,
        pointF,
    ]);
    return { leaves: [middleSquare], branchSpecs: branchSpecs, base: 4, name: "Fat Identity Return Quadrilateral" };
};
var irq_thin_quaternary = function () {
    var pointA = quaternary('_010');
    var pointB = quaternary('_100');
    var pointC = quaternary('2_001');
    var pointD = quaternary('_200');
    var pointE = quaternary('3_002');
    var pointF = quaternary('3_100');
    var branchSpecs = [
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointA, pointF), pointF),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointB, pointC), pointC),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointD, pointE), pointE),
    ];
    var middleSquare = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
        quaternary('_033'),
        pointB,
        pointD,
        quaternary('_300'),
    ]);
    return { leaves: [middleSquare], branchSpecs: branchSpecs, base: 4, name: "Thin Identity Return Triangle" };
};
var never_close_quintary = function () {
    var pointA = quintary('0_033');
    var pointB = quintary('_033');
    var pointC = quintary('1_330');
    var pointD = quintary('_200');
    var pointE = quintary('3_002');
    var pointF = quintary('_303');
    var pointG = quintary('_330');
    var pointH = quintary('4_303');
    var branchSpecs = [
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointA, pointF), pointA),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointB, pointC), pointC),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointD, pointE), pointE),
        Object(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["makeBranchSpec"])(laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Chord"].new(pointG, pointH), pointH),
    ];
    var bigTriangle = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
        pointB,
        pointD,
        quintary('_300')
    ]);
    var mediumTriangle = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
        quintary('_020'),
        quintary('_030'),
        pointF
    ]);
    var smallTriangle = laminations_lib__WEBPACK_IMPORTED_MODULE_2__["Polygon"].new([
        quintary('_002'),
        quintary('_003'),
        pointG
    ]);
    return {
        leaves: [bigTriangle, mediumTriangle, smallTriangle],
        branchSpecs: branchSpecs,
        base: 5,
        name: "Never Close (quintary)"
    };
};
var never_close_quintary_def = {
    name: 'never close (quintary)',
    base: 5,
    leaves: [
        { points: ['_033', '_200', '_300'] },
        { points: ['_020', '_030', '_303'] },
        { points: ['_002', '_003', '_330'] }
    ],
    branches: [
        {
            chord: ['0_033', '_303'],
            endpoints: ['0_033']
        },
        {
            chord: ['_033', '1_330'],
            endpoints: ['1_330']
        },
        {
            chord: ['_200', '3_002'],
            endpoints: ['3_002']
        },
        {
            chord: ['_330', '4_303'],
            endpoints: ['4_303']
        },
    ]
};
var template = "{\n  \"name\": \"EXAMPLE LAMINATION\",\n  \"base\": 3,\n  \"branches\": [\n    {\n      \"chord\": [\"_002\", \"2_020\"],\n      \"endpoints\": [\"2_020\"]\n    },\n    {\n      \"chord\": [\"_101\", \"2_011\"],\n      \"endpoints\": [\"2_011\"]\n    }\n  ],\n  \"leaves\": [\n    {\"points\": [\"_002\", \"_101\", \"_201\"]},\n    {\"points\": [\"_011\", \"_020\", \"_012\"]},\n    {\"points\": [\"_110\", \"_200\", \"_120\"]}\n  ]\n}\n";


/***/ }),

/***/ "./src/app/lamination-builder/lamination-builder.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/lamination-builder/lamination-builder.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\ninput[type=\"file\"] {\n    display: none;\n}\n\n.custom-file-upload {\n    border: 1px solid #ccc;\n    display: inline-block;\n    padding: 6px 12px;\n    cursor: pointer;\n}\n\n.custom-file-upload:hover {\n    background-color: #ccc;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGFtaW5hdGlvbi1idWlsZGVyL2xhbWluYXRpb24tYnVpbGRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCIiwiZmlsZSI6InNyYy9hcHAvbGFtaW5hdGlvbi1idWlsZGVyL2xhbWluYXRpb24tYnVpbGRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbnB1dFt0eXBlPVwiZmlsZVwiXSB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuLmN1c3RvbS1maWxlLXVwbG9hZCB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcGFkZGluZzogNnB4IDEycHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uY3VzdG9tLWZpbGUtdXBsb2FkOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/lamination-builder/lamination-builder.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/lamination-builder/lamination-builder.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <input type=\"text\" [(ngModel)]=\"laminationData.name\">\n  <label class=\"custom-file-upload\">\n      <input type=\"file\" (change)=\"uploadFile($event.target)\">\n    Upload JSON\n  </label>\n  \n  <button (click)=\"saveTemplateFile()\">Save Template</button>\n  \n</div>\n\n<div>\n  <strong style=\"margin-right: 4px\">Pullbacks:</strong>\n  <input type=\"number\" [value]=\"numPullbacks\" (input)=\"setNumPullbacks($event.target.value)\"\n    style=\"max-width: 40px; margin-right: 4px\">\n  <strong style=\"margin-right: 4px\">Preview Size:</strong>\n  <input type=\"number\" [(ngModel)]=\"renderSettings.size\"\n    style=\"max-width: 60px; margin-right: 4px\">\n  <button (click)=\"generateLamination()\">Refresh</button>\n  <button (click)=\"saveSvg()\">Export SVG</button>\n</div>\n\n<br/>\n\n<app-lamination-viewer [laminationState]=\"laminationState\" [settings]=\"renderSettings\"></app-lamination-viewer>\n\n<a href=\"https://github.com/csfalcione/lamination-builder/\" target=\"_blank\">Source and Documentation</a>"

/***/ }),

/***/ "./src/app/lamination-builder/lamination-builder.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/lamination-builder/lamination-builder.component.ts ***!
  \********************************************************************/
/*! exports provided: LaminationBuilderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LaminationBuilderComponent", function() { return LaminationBuilderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _lamination_renderer_svg_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lamination-renderer/svg-renderer */ "./src/app/lamination-renderer/svg-renderer.ts");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _example_laminations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../example-laminations */ "./src/app/example-laminations.ts");







var LaminationBuilderComponent = /** @class */ (function () {
    function LaminationBuilderComponent() {
        this.renderSettings = this.initialRenderSettings();
        this.laminationData = _example_laminations__WEBPACK_IMPORTED_MODULE_5__["rabbitLamination"]();
        this.laminationState = this.laminationStateIdentity();
        this.numPullbacks = 0;
    }
    LaminationBuilderComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.generateLamination(); });
    };
    LaminationBuilderComponent.prototype.generateLamination = function () {
        var _this = this;
        var iterations = this.numPullbacks + 1;
        var addLaminationStates = function (a, b) {
            var newMap = new Map(a.laminationMap.entries());
            b.lamination.forEach(function (poly) {
                newMap.set("" + poly, poly);
            });
            return {
                laminationMap: newMap,
                criticalChords: b.criticalChords,
            };
        };
        var data = this.laminationData;
        Object(_example_laminations__WEBPACK_IMPORTED_MODULE_5__["pullbackObservable"])(data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["scan"])(addLaminationStates, { laminationMap: new Map(), criticalChords: [] }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var laminationMap = _a.laminationMap, criticalChords = _a.criticalChords;
            return { lamination: tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](laminationMap.values()), criticalChords: criticalChords };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(iterations))
            .subscribe(function (state) {
            _this.laminationState = state;
        });
    };
    LaminationBuilderComponent.prototype.setNumPullbacks = function (input) {
        var parsed = parseInt(input);
        if (isNaN(parsed)) {
            return;
        }
        this.numPullbacks = parsed;
        this.generateLamination();
    };
    LaminationBuilderComponent.prototype.uploadFile = function (eventTarget) {
        var _this = this;
        var file = eventTarget.files[0];
        var reader = new FileReader();
        var cleanUp = function () {
            eventTarget.value = '';
        };
        var successHandler = function () {
            try {
                var definition = JSON.parse(reader.result);
                _this.laminationData = Object(_example_laminations__WEBPACK_IMPORTED_MODULE_5__["parseLaminationDefinition"])(definition);
                _this.numPullbacks = 0;
                _this.generateLamination();
            }
            catch (e) {
                alert(e);
            }
            finally {
                cleanUp();
            }
        };
        var errorHandler = function () {
            alert("Error reading " + file.name);
            cleanUp();
        };
        reader.addEventListener('load', successHandler);
        reader.addEventListener('error', errorHandler);
        reader.readAsText(file);
    };
    LaminationBuilderComponent.prototype.saveTemplateFile = function () {
        Object(file_saver__WEBPACK_IMPORTED_MODULE_4__["saveAs"])(new Blob([_example_laminations__WEBPACK_IMPORTED_MODULE_5__["template"]]), 'Example Lamination.json', {
            type: 'application/json'
        });
    };
    LaminationBuilderComponent.prototype.saveSvg = function () {
        var renderer = Object(_lamination_renderer_svg_renderer__WEBPACK_IMPORTED_MODULE_3__["makeSvgRenderer"])(this.renderSettings);
        var svgString = renderer.render(this.laminationState);
        var name = this.laminationData.name;
        Object(file_saver__WEBPACK_IMPORTED_MODULE_4__["saveAs"])(new Blob([svgString]), name + " - pullback " + this.numPullbacks + ".svg", {
            type: 'image/svg+xml'
        });
    };
    LaminationBuilderComponent.prototype.laminationStateIdentity = function () {
        return {
            lamination: [],
            criticalChords: [],
        };
    };
    LaminationBuilderComponent.prototype.initialRenderSettings = function () {
        return {
            renderHyperbolic: true,
            size: 600,
            polygonColor: '#CC0000',
            chordColor: '#000000',
            criticalChordColor: '#0000AA',
            backgroundColor: '#DBDBDB',
            circleColor: '#000000',
        };
    };
    LaminationBuilderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-lamination-builder',
            template: __webpack_require__(/*! ./lamination-builder.component.html */ "./src/app/lamination-builder/lamination-builder.component.html"),
            styles: [__webpack_require__(/*! ./lamination-builder.component.css */ "./src/app/lamination-builder/lamination-builder.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LaminationBuilderComponent);
    return LaminationBuilderComponent;
}());



/***/ }),

/***/ "./src/app/lamination-renderer/canvas-renderer.ts":
/*!********************************************************!*\
  !*** ./src/app/lamination-renderer/canvas-renderer.ts ***!
  \********************************************************/
/*! exports provided: makeCanvasRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeCanvasRenderer", function() { return makeCanvasRenderer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var laminations_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! laminations-lib */ "./node_modules/laminations-lib/dist/index.js");
/* harmony import */ var laminations_lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(laminations_lib__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _svg_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svg-renderer */ "./src/app/lamination-renderer/svg-renderer.ts");



var makeCanvasRenderer = function (ctx, settings) {
    var getRadius = function () { return Math.floor(settings.size / 2) - 10; };
    var getMidpoint = function () {
        var half = settings.size / 2;
        return [half, half];
    };
    var clearCanvas = function () {
        var size = settings.size;
        ctx.clearRect(0, 0, size, size);
    };
    var drawPolygon = function (polygon) {
        var radius = getRadius();
        var svgPathString = Object(_svg_renderer__WEBPACK_IMPORTED_MODULE_2__["makeSVGPath"])(polygon, radius, settings.renderHyperbolic);
        var path = new Path2D(svgPathString);
        ctx.stroke(path);
        if (polygon.points.length > 2) {
            ctx.fill(path);
        }
    };
    var drawLamination = function (lamination) {
        lamination.forEach(drawPolygon);
    };
    var drawCriticalChords = function (chords) {
        drawLamination(chords.map(laminations_lib__WEBPACK_IMPORTED_MODULE_1__["Polygon"].fromChord));
    };
    var drawCircle = function (radius) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.clip();
        ctx.closePath();
        ctx.stroke();
    };
    var render = function (laminationState) {
        clearCanvas();
        var _a = tslib__WEBPACK_IMPORTED_MODULE_0__["__read"](getMidpoint(), 2), midX = _a[0], midY = _a[1];
        // Transforms space so that origin is in middle of canvas, up is
        // the positive y direction, and right is the positive x direction.
        ctx.transform(1, 0, 0, -1, midX, midY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = settings.circleColor;
        drawCircle(getRadius());
        ctx.lineWidth = 2;
        ctx.strokeStyle = settings.chordColor;
        ctx.fillStyle = settings.polygonColor;
        drawLamination(laminationState.lamination);
        ctx.lineWidth = 2;
        ctx.strokeStyle = settings.criticalChordColor;
        drawCriticalChords(laminationState.criticalChords);
        ctx.resetTransform();
    };
    return { render: render };
};


/***/ }),

/***/ "./src/app/lamination-renderer/svg-renderer.ts":
/*!*****************************************************!*\
  !*** ./src/app/lamination-renderer/svg-renderer.ts ***!
  \*****************************************************/
/*! exports provided: makeSVGPath, makeSvgRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeSVGPath", function() { return makeSVGPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeSvgRenderer", function() { return makeSvgRenderer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var laminations_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! laminations-lib */ "./node_modules/laminations-lib/dist/index.js");
/* harmony import */ var laminations_lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(laminations_lib__WEBPACK_IMPORTED_MODULE_1__);


// JS's % operator performs the remainder operation, not the modulus operation.
// They behave differently for negatives.
var mod = function (a, b) { return ((a % b) + b) % b; };
var toRadians = function (t) { return 2 * Math.PI * t.toNumber(); };
var svgPoint = function (t, radius) {
    var angle = toRadians(t);
    var xCoord = Math.floor(radius * Math.cos(angle));
    var yCoord = Math.floor(radius * Math.sin(angle));
    return xCoord + "," + yCoord;
};
var getLinePathTo = function (point, prevPoint, circleRadius, hyperbolic) {
    if (!hyperbolic) {
        return "L " + svgPoint(point, circleRadius);
    }
    var chordWidth = mod(point.toNumber() - prevPoint.toNumber(), 1);
    if (Math.abs(chordWidth - 0.5) < 0.0001) {
        return getLinePathTo(point, prevPoint, circleRadius, false);
    }
    var sweepFlag = chordWidth <= 0.5 ? 0 : 1;
    var arcRadius = circleRadius * Math.tan(Math.PI * Math.min(chordWidth, 1 - chordWidth));
    return "A " + arcRadius + "," + arcRadius + " 0 0," + sweepFlag + " " + svgPoint(point, circleRadius);
};
var makeSVGPath = function (polygon, circleRadius, hyperbolic) {
    var pathSpecs = [];
    var points = polygon.points;
    pathSpecs.push("M " + svgPoint(points[0], circleRadius));
    for (var i = 1; i < points.length; i++) {
        var point = points[i];
        var prevPoint = points[i - 1];
        pathSpecs.push(getLinePathTo(point, prevPoint, circleRadius, hyperbolic));
    }
    if (points.length > 2) {
        pathSpecs.push(getLinePathTo(points[0], points[points.length - 1], circleRadius, hyperbolic));
    }
    return pathSpecs.join(' ');
};
var tag = function (name, attributes, body) {
    if (attributes === void 0) { attributes = {}; }
    if (body === void 0) { body = ''; }
    var renderedAttributes = Object.entries(attributes)
        .filter(function (_a) {
        var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__read"](_a, 2), key = _b[0], _ = _b[1];
        return attributes.hasOwnProperty(key);
    })
        .map(function (_a) {
        var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__read"](_a, 2), key = _b[0], val = _b[1];
        return key + "=\"" + val + "\"";
    })
        .join(' ');
    return "<" + name + " " + renderedAttributes + ">" + body + "</" + name + ">";
};
var defaultSvgAttrs = {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
};
var makeSvgRenderer = function (settings) {
    var radius = Math.floor(settings.size / 2) - 10;
    var render = function (laminationState) {
        var midpoint = settings.size / 2;
        var transform = "matrix(1,0,0,-1," + midpoint + "," + midpoint + ")";
        var circle = tag('circle', {
            r: radius,
            stroke: settings.circleColor,
            'stroke-width': 3,
            fill: 'none',
            transform: transform,
        });
        var chords = laminationState.lamination
            .map(function (polygon) {
            var strokeWidth = 1;
            if (polygon.toChords().some(function (chord) {
                var width = chord.upper.toNumber() - chord.lower.toNumber();
                return width < 0.01 || 1 - width < 0.01;
            })) {
                strokeWidth = 0.25;
            }
            return tag('path', {
                stroke: settings.chordColor,
                fill: polygon.points.length > 2 ? settings.polygonColor : 'none',
                'stroke-width': strokeWidth,
                transform: transform,
                d: makeSVGPath(polygon, radius, settings.renderHyperbolic)
            });
        })
            .join('');
        var criticalChords = laminationState.criticalChords
            .map(function (chord) { return tag('path', {
            stroke: settings.criticalChordColor,
            'stroke-width': 2,
            fill: 'none',
            transform: transform,
            d: makeSVGPath(laminations_lib__WEBPACK_IMPORTED_MODULE_1__["Polygon"].fromChord(chord), radius, settings.renderHyperbolic)
        }); })
            .join('');
        return tag('svg', tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, defaultSvgAttrs, { width: settings.size, height: settings.size, 'background-color': settings.backgroundColor }), "" + circle + chords + criticalChords);
    };
    return { render: render };
};


/***/ }),

/***/ "./src/app/lamination-viewer/lamination-viewer.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/lamination-viewer/lamination-viewer.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xhbWluYXRpb24tdmlld2VyL2xhbWluYXRpb24tdmlld2VyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/lamination-viewer/lamination-viewer.component.html":
/*!********************************************************************!*\
  !*** ./src/app/lamination-viewer/lamination-viewer.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<canvas #laminationCanvas [width]=\"settings.size\" [height]=\"settings.size\"\n  style=\"background-color: rgb(219, 219, 219)\">\n  Your browser apparently doesn't support HTML5 canvases. Please use\n  a recent version of Chrome, Firefox, Microsoft Edge, or Safari.\n</canvas>\n\n<br/>\n\n<h3>Debug:</h3>\n<pre style=\"background-color: rgb(219, 219, 219); font-family: 'Courier New', Courier, monospace;\n  max-width: 600px\">{{prettyPrint(laminationState.lamination)}}</pre>"

/***/ }),

/***/ "./src/app/lamination-viewer/lamination-viewer.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/lamination-viewer/lamination-viewer.component.ts ***!
  \******************************************************************/
/*! exports provided: LaminationViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LaminationViewerComponent", function() { return LaminationViewerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var laminations_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! laminations-lib */ "./node_modules/laminations-lib/dist/index.js");
/* harmony import */ var laminations_lib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(laminations_lib__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lamination_renderer_canvas_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lamination-renderer/canvas-renderer */ "./src/app/lamination-renderer/canvas-renderer.ts");




var LaminationViewerComponent = /** @class */ (function () {
    function LaminationViewerComponent() {
    }
    LaminationViewerComponent.prototype.ngOnInit = function () { };
    LaminationViewerComponent.prototype.ngOnChanges = function () {
        var ctx = this.canvas.nativeElement.getContext('2d');
        var renderer = Object(_lamination_renderer_canvas_renderer__WEBPACK_IMPORTED_MODULE_3__["makeCanvasRenderer"])(ctx, this.settings);
        renderer.render(this.laminationState);
    };
    LaminationViewerComponent.prototype.prettyPrint = function (lamination) {
        return lamination
            .sort(function (a, b) { return laminations_lib__WEBPACK_IMPORTED_MODULE_2__["NaryFraction"].compare(a.points[0], b.points[0]); })
            .map(function (poly) { return "" + poly; }).join("\n");
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LaminationViewerComponent.prototype, "settings", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LaminationViewerComponent.prototype, "laminationState", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('laminationCanvas'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], LaminationViewerComponent.prototype, "canvas", void 0);
    LaminationViewerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-lamination-viewer',
            template: __webpack_require__(/*! ./lamination-viewer.component.html */ "./src/app/lamination-viewer/lamination-viewer.component.html"),
            styles: [__webpack_require__(/*! ./lamination-viewer.component.css */ "./src/app/lamination-viewer/lamination-viewer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LaminationViewerComponent);
    return LaminationViewerComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/caleb/Dropbox/Projects/laminations/lamination-builder/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map