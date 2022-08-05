import { MigrationInterface, QueryRunner } from "typeorm";

export class init1659693231404 implements MigrationInterface {
    name = 'init1659693231404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refHash"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "refHash" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refHash"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "refHash" character varying NOT NULL`);
    }

}
