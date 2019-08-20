// tslint:disable-next-line:max-line-length
const createMigrationTable = 'CREATE TABLE MIGRATION (id INT PRIMARY KEY NOT NULL, numero VARCHAR(10), lastRequest VARCHAR(1000), executionDate DATE)';
const createSidoTable = 'CREATE TABLE SIDO_LDD (id INT PRIMARY KEY NOT NULL, numero INT, statut VARCHAR(10))';

export const DATABASE_MIGRATION_MAP = new Map()
    .set(1, createMigrationTable)
    .set(2, createSidoTable);
