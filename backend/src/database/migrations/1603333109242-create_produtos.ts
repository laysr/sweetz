import {MigrationInterface, QueryRunner, Table} from "typeorm";

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
                    name: 'image_path',
                    type: 'varchar',
                    isNullable: true,
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('produtos');
    }

}
