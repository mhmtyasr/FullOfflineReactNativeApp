import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {EntityBase} from './_base';
import {Todo} from './todo';
import {AutoMap} from '@automapper/classes';

@Entity({
  name: 'TodoDetails',
})
export class TodoDetail extends EntityBase {
  @AutoMap()
  @Column()
  detail: string;

  @AutoMap()
  @Column({default: false})
  isCompleted: boolean;

  @ManyToOne(() => Todo, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({name: 'todoId'})
  readonly todo: Todo;

  @Column()
  todoId: string;
}
