import {Entity, Column, OneToMany} from 'typeorm';
import {EntityBase} from './_base';
import {TodoDetail} from './todoDetails';
import {AutoMap} from '@automapper/classes';

@Entity({
  name: 'Todos',
})
export class Todo extends EntityBase {
  @AutoMap()
  @Column()
  title: string;

  @AutoMap()
  @Column()
  description: string;

  @OneToMany(() => TodoDetail, todoDetail => todoDetail.todo, {
    eager: true,
  })
  todoDetails: TodoDetail[];

  @AutoMap()
  get isCompleted(): boolean {
    return (
      this.todoDetails.length > 0 &&
      this.todoDetails.every(detail => detail.isCompleted)
    );
  }
}
