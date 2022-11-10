import {
    Entity,
    Column,
    OneToMany,
    PrimaryColumn
} from "typeorm"
import { Reviews } from "./Review";

@Entity()
export class Users {
    // @OneToMany(() => Review, (review) => review.user_id)
    @OneToMany(() => Reviews, (review) => review.user_id)
    @PrimaryColumn()
    id!: number

    @Column({
        length: 15,
        name: "name"
    })
    name!: string

    @Column({
        name: "age",
        type: "int"
    })
    age!: number

    @Column({
        name: "gender",
        type: "int"
    })
    gender!: number

    @Column({
        name: "image",
        nullable: true,
    })
    image!: string
}