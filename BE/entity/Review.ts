import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn
} from "typeorm"
import { Movie } from "./Movie";
import { User } from "./User";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn([{
        name: "user_id"
    }])
    user_id?: number

    @ManyToOne(() => Movie, (movie) => movie.id)
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