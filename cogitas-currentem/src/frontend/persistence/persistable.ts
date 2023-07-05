
import {  PrimaryGeneratedColumn } from "typeorm"




export abstract class Persistable {

    @PrimaryGeneratedColumn('uuid')
    id : string

    abstract init();

}
