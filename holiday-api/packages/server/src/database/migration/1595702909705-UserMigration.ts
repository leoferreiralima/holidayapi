import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class UserMigration1595702909705 implements MigrationInterface {
  name = 'UserMigration1595702909705'
  tableName = 'user'
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '80'
          },
          {
            name: 'email',
            type: 'varchar',
            length: '80'
          },
          {
            name: 'password_hash',
            type: 'varchar',
            length: '80'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
