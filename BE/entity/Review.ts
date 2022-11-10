import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"
import { Movies } from "./Movie";
import { Users } from "./User";

@Entity()
export class Reviews {
    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn([{
        name: "user_id"
    }])
    user_id?: number

    @ManyToOne(() => Movies, (movie) => movie.id)
    @JoinColumn([{
        name: "movie_id"
    }])
    movie_id?: number

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

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at!: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at!: Date;
}
 
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