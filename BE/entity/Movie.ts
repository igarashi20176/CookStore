import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm"
import { Reviews } from "./Review";

@Entity()
export class Movies {
    // @OneToMany(() => Review, (review) => review.movie_id)
    @OneToMany(() => Reviews, (review) => review.movie_id)
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 30,
        name: "title",
    })
    title!: string

    @Column({
        length: 20,
        name: "genre",
    })
    genre!: string

    @Column({
        length: 30,
        name: "director"
    })
    director!: string

    @Column({
        length: 30,
        name: "actor_1",
    })
    actor_1!: string

    @Column({
        length: 30,
        name: "actor_2",
        nullable: true,
    })
    actor_2!: string

    @Column({
        name: "image",
        nullable: true
    })
    image!: string
}