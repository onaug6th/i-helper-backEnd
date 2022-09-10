import { Entity, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class TEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @CreateDateColumn()
    createTime: number = Date.now()
}