import {
    Entity,
    CreateDateColumn,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm"
import { Reviews } from "./Review";
import { Users } from "./User";

@Entity()
export class Comments {
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

    @Column({
        type: "text",
        name: "content"
    })
    content!: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at!: Date;
}