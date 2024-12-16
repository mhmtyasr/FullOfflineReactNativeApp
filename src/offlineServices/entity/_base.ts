import {generateUUID} from '@/utils/uuidUtils';
import {AutoMap} from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class EntityBase {
  constructor() {
    this.id = generateUUID();
  }
  @AutoMap()
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @AutoMap()
  @CreateDateColumn()
  createdDate: Date;

  @AutoMap()
  @UpdateDateColumn({
    nullable: true,
  })
  updatedDate?: Date | null;

  @AutoMap()
  @DeleteDateColumn({
    nullable: true,
  })
  deletedDate?: Date | null;
}
