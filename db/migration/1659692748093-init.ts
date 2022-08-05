import { MigrationInterface, QueryRunner } from "typeorm";

export class init1659692748093 implements MigrationInterface {
    name = 'init1659692748093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refHash" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refHash"`);
    }

}
