"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movies = void 0;
const typeorm_1 = require("typeorm");
const Review_1 = require("./Review");
let Movies = class Movies {
};
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Reviews, (review) => review.movie_id),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Movies.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        name: "title",
    }),
    __metadata("design:type", String)
], Movies.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 20,
        name: "genre",
    }),
    __metadata("design:type", String)
], Movies.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        name: "director"
    }),
    __metadata("design:type", String)
], Movies.prototype, "director", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        name: "actor_1",
    }),
    __metadata("design:type", String)
], Movies.prototype, "actor_1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        name: "actor_2",
        nullable: true,
    }),
    __metadata("design:type", String)
], Movies.prototype, "actor_2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "image",
        nullable: true
    }),
    __metadata("design:type", String)
], Movies.prototype, "image", void 0);
Movies = __decorate([
    (0, typeorm_1.Entity)()
], Movies);
exports.Movies = Movies;
