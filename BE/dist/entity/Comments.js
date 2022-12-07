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
exports.Comments = void 0;
const typeorm_1 = require("typeorm");
const Review_1 = require("./Review");
const User_1 = require("./User");
let Comments = class Comments {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.Users, (user) => user.id),
    (0, typeorm_1.JoinColumn)([{
            name: "user_id"
        }]),
    __metadata("design:type", Number)
], Comments.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Review_1.Reviews, (review) => review.id),
    (0, typeorm_1.JoinColumn)([{
            name: "review_id"
        }]),
    __metadata("design:type", Number)
], Comments.prototype, "review_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        name: "content"
    }),
    __metadata("design:type", String)
], Comments.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", Date)
], Comments.prototype, "created_at", void 0);
Comments = __decorate([
    (0, typeorm_1.Entity)()
], Comments);
exports.Comments = Comments;
