import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createProdutos1603333109242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'produtos',
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
                    name: 'descricao',
                    type: 'text',
                },
                {
                    name: 'preco',
                    type: 'decimal',
                },
                {
                    name: 'custo',
                    type: 'decimal',
                    isNullable: true,
                },
                {
                    name: 'image_path',
                    type: 'varchar',
                    isNullable: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'ConfeitariaProduto',
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
        await queryRunner.dropTable('produtos');
    }

}
