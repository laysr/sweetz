import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createIngredientes1603332243498 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'ingredientes',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'confeitaria',
                    type: 'integer',
                },
                {
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'quantidade',
                    type: 'integer',
                },
                {
                    name: 'unidade',
                    type: 'varchar',
                },
                {
                    name: 'preco',
                    type: 'decimal',
                }
            ],
            foreignKeys: [
                {
                    name: 'ConfeitariaIngrediente',
                    columnNames: ['confeitaria'],
                    referencedTableName: 'confeitarias',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ingredientes');
    }

}
