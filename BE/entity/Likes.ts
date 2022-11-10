import {
    Entity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm"
import { Reviews } from "./Review";
import { Users } from "./User";

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn([{
        name: "user_id"
    }])
    user_id!: number

    @ManyToOne(() => Reviews, (review) => review.id)
    @JoinColumn([{
        name: "review_id"
    }])
    review_id!: number
}