import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createConfeitarias1603060860327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'confeitarias',
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
                    name: 'nome_negocio',
                    type: 'varchar',
                },
                {
                    name: 'cnpj',
                    type: 'number',
                    isNullable: true,
                },
                {
                    name: 'descricao',
                    type: 'text',
                },
                {
                    name: 'telefone',
                    type: 'integer',
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
                {
                    name: 'logo_path',
                    type: 'varchar',
                    isNullable: true,
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('confeitarias')
    }

}
