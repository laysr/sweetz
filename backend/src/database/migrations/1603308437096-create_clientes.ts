import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createClientes1603308437096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'clientes',
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
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'senha',
                    type: 'text',
                },
                {
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'cpf',
                    type: 'integer',
                },
                {
                    name: 'telefone',
                    type: 'integer',
                    isNullable: true,
                },
                {
                    name: 'rua',
                    type: 'varchar',
                },
                {
                    name: 'numero',
                    type: 'integer',
                },
                {
                    name: 'complemento',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'referencia',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'bairro',
                    type: 'varchar'
                },
                {
                    name: 'cidade',
                    type: 'varchar'
                },
                {
                    name: 'estado',
                    type: 'varchar'
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('confeitarias');
    }

}
