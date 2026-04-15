import { Knex } from 'knex';

export type DB = Knex;

export interface Transaction<T = any> {
  (trx: Knex.Transaction): Promise<T>;
}

export interface Repository<T> {
  findOne?(id: number): Promise<T | null>;
  findAll?(): Promise<T[]>;
  create?(payload: Partial<T>, trx?: Knex.Transaction): Promise<number>;
}
