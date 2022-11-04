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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const Movie_1 = require("./Movie");
const User_1 = require("./User");
let Review = class Review {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "int",
    }),
    __metadata("design:type", Number)
], Review.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)([{
            name: "user_id"
        }]),
    (0, typeorm_1.PrimaryColumn)({
        type: "int",
    }),
    __metadata("design:type", Number)
], Review.prototype, "movie_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Movie_1.Movie, (movie) => movie.id),
    (0, typeorm_1.JoinColumn)([{
            name: "movie_id"
        }]),
    (0, typeorm_1.Column)({
        type: "text",
        name: "content",
    }),
    __metadata("design:type", String)
], Review.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "category",
    }),
    __metadata("design:type", String)
], Review.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "rewatch",
        type: "boolean",
    }),
    __metadata("design:type", Boolean)
], Review.prototype, "rewatch", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "rating",
        type: "int",
    }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "publish",
        type: "date",
    }),
    __metadata("design:type", String)
], Review.prototype, "publish", void 0);
Review = __decorate([
    (0, typeorm_1.Entity)()
], Review);
exports.Review = Review;
