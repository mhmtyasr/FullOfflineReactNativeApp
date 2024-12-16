import {DataSource, EntityManager} from 'typeorm';
import {DependencyInjectionTokens} from '@/utils/dependencyInjectionTokens';
import {container} from 'tsyringe';
import RepositoryBase from '@/offlineServices/repository/_repositoryBase';

export function UnitOfWork(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const dataSource: DataSource = container.resolve(
      DependencyInjectionTokens.dataSource,
    );

    return await dataSource.transaction(
      async (transactionManager: EntityManager) => {
        const repositories = Object.keys(DependencyInjectionTokens)
          .filter(key => key.endsWith('Repository'))
          .map(
            tokenKey =>
              container.resolve(
                DependencyInjectionTokens[
                  tokenKey as keyof typeof DependencyInjectionTokens
                ],
              ) as RepositoryBase<never>,
          );

        repositories.forEach(repository => {
          repository.setManager(transactionManager);
        });

        try {
          transactionManager.queryRunner?.startTransaction();

          const result = await originalMethod.apply(this, args);

          await transactionManager.queryRunner?.commitTransaction();

          return result;
        } catch (error) {
          await transactionManager.queryRunner?.rollbackTransaction();
          throw error;
        } finally {
          repositories.forEach(repository => {
            repository.resetManager();
          });
          await transactionManager.queryRunner?.release();
        }
      },
    );
  };

  return descriptor;
}
