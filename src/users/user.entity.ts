import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeRemove,
} from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude() // Don't apply serialization here
  password: string;

  @Column({ default: true })
  admin: boolean;

  @Column() // Added by me for testing find() method which returns array
  username: string;

  @OneToMany(() => Report, (report) => report.user) // Association: One user creates many reports.
  // This decorator don't change database. Association is not automatically fetched when we fetch a User.
  reports: Report[];

  // Hooks will only work for save(), remove() AND not for insert(), update(), delete()

  @AfterInsert()
  logInsert() {
    console.log('Entity HOOK: Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Entity HOOK: Updated User with id', this.id);
  }


  @BeforeRemove()
  logBeforeRemove() {
    console.log('Entity HOOK: Removed User with id', this.id);
  }

  @AfterRemove()
  logAfterRemove() {
    console.log('Entity HOOK: Removed User with id', this.id);
  }
}
