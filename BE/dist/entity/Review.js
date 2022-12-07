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
exports.Reviews = void 0;
const typeorm_1 = require("typeorm");
const Movie_1 = require("./Movie");
const User_1 = require("./User");
let Reviews = class Reviews {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reviews.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.Users, (user) => user.id),
    (0, typeorm_1.JoinColumn)([{
            name: "user_id"
        }]),
    __metadata("design:type", Number)
], Reviews.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Movie_1.Movies, (movie) => movie.id),
    (0, typeorm_1.JoinColumn)([{
            name: "movie_id"
        }]),
    __metadata("design:type", Number)
], Reviews.prototype, "movie_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        name: "content",
    }),
    __metadata("design:type", String)
], Reviews.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "category",
    }),
    __metadata("design:type", String)
], Reviews.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "rewatch",
        type: "boolean",
    }),
    __metadata("design:type", Boolean)
], Reviews.prototype, "rewatch", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "rating",
        type: "int",
    }),
    __metadata("design:type", Number)
], Reviews.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "publish",
        type: "date",
    }),
    __metadata("design:type", String)
], Reviews.prototype, "publish", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", Date)
], Reviews.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", Date)
], Reviews.prototype, "updated_at", void 0);
Reviews = __decorate([
    (0, typeorm_1.Entity)()
], Reviews);
exports.Reviews = Reviews;
/*  外部キー = 主キー
@Entity()
export class Review {
    @PrimaryColumn({
        type: "int",
    })
    user_id?: number
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn([{
        name: "user_id"
    }])

    @PrimaryColumn({
        type: "int",
    })
    movie_id?: number
    @ManyToOne(() => Movie, (movie) => movie.id)
    @JoinColumn([{
        name: "movie_id"
    }])

    @Column({
        type: "text",
        name: "content",
    })
    content!: string

    @Column({
        name: "category",
    })
    category!: string

    @Column({
        name: "rewatch",
        type: "boolean",
    })
    rewatch!: boolean

    @Column({
        name: "rating",
        type: "int",
    })
    rating!: number
    
    @Column({
        name: "publish",
        type: "date",
    })
    publish!: string
}
*/ 
