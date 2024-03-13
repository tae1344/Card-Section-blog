import Repository from '@data/Repository';

export default interface CrudRepository<T> extends Repository<T> {
  save(entity: T): Promise<T | null>;
  findOne(id: number): Promise<T>;
  update(id: number, entity: T): Promise<T | null>;
  delete(id: number);
}
