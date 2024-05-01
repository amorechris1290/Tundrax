import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableColumn } from 'typeorm/schema-builder/table/TableColumn';

export class AlterUsersTable1714484086176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', 
            new TableColumn({
                name: 'role',
                type: 'enum',
                enum: ['admin', 'user'],
                default: '\'user\'',
                isNullable: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'role');
    }

}
