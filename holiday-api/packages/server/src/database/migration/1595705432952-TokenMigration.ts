import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex
} from 'typeorm'

export class TokenMigration1595705432952 implements MigrationInterface {
  name = 'TokenMigration1595705432952'
  tableName = 'token'
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'token',
            type: 'varchar',
            length: '80',
            isPrimary: true
          },
          {
            name: 'type',
            type: 'varchar',
            length: '30'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'user_id',
            type: 'uuid'
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        columnNames: ['user_id']
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
