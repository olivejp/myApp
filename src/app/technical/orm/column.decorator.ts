import {ColumnDefinition} from './column-definition';
import {SQLiteType} from './sqlite-type';

function getId(entity: any): any {
    const columns = Object.getPrototypeOf(entity)[`columns`];
    for (const entry of columns.entries()) {
        const key: string = entry[0];
        const value: ColumnDefinition = entry[1];
        if (value.primary) {
            return entity[key];
        }
    }
    return undefined;
}

function getSqlCreate(columns: Map<string, ColumnDefinition>, entity: any): string {
    const tableName = entity[`tableName`];
    let requestToCreate = 'CREATE TABLE ' + tableName + ' (';
    for (const entry of columns.entries()) {
        const value: ColumnDefinition = entry[1];
        requestToCreate += value.name + ' ' + value.type;
        requestToCreate += (value.primary) ? ' PRIMARY KEY' : '';
        requestToCreate += (value.autoGenerated) ? ' AUTOINCREMENT' : '';
        requestToCreate += (value.notNull) ? ' NOT NULL' : '';
        requestToCreate += (value.unique) ? ' UNIQUE' : '';
        requestToCreate += ', ';
    }
    requestToCreate = requestToCreate.substring(0, requestToCreate.length - 2);
    requestToCreate += ');';
    return requestToCreate;
}

function getSqlUpdate(entity: any): string {
    const columns = Object.getPrototypeOf(entity)[`columns`];
    const tableName = Object.getPrototypeOf(entity)[`tableName`];
    let sqlUpdate: string = 'UPDATE ' + tableName;
    sqlUpdate += ' SET ';
    return sqlUpdate;
}

function getSqlInsertInto(entity: any): string {
    const columns = Object.getPrototypeOf(entity)[`columns`];
    const tableName = Object.getPrototypeOf(entity)[`tableName`];
    let sqlInsert: string = 'INSERT INTO ' + tableName + ' (';
    for (const entry of columns.entries()) {
        const key = entry[0];
        const value: ColumnDefinition = entry[1];
        if (entity[key]) {
            sqlInsert += value.name + ', ';
        }
    }
    sqlInsert = sqlInsert.substring(0, sqlInsert.length - 2);

    sqlInsert += ') VALUES (';
    for (const entry of columns.entries()) {
        const key = entry[0];
        const value: ColumnDefinition = entry[1];
        if (entity[key]) {
            sqlInsert += (value.type === SQLiteType.TEXT) ? '\'' + entity[key] + '\'' : entity[key];
            sqlInsert += ', ';
        }
    }
    sqlInsert = sqlInsert.substring(0, sqlInsert.length - 2);
    sqlInsert += ');';

    return sqlInsert;
}

export function Column(columnDefinition: ColumnDefinition): any {
    return (target, key) => {
        // Recherche ou création d'une propriété `columns` dans le prototype de la classe
        const accessor = `columns`;
        if (!target[accessor]) {
            target[accessor] = new Map<string, ColumnDefinition>();
        }
        const columnsMap: Map<string, ColumnDefinition> = target[accessor];

        // Ajout dans la map de la nouvelle ColumnDefinition
        columnsMap.set(key, columnDefinition);
        const sqlCreate: string = getSqlCreate(columnsMap, target);

        /**
         * Ajout dans le prototype de l'objet des méthodes :
         * -getId(entity) qui permet de récupérer l'Id de l'entité
         * -getCreateSql() qui retourne la requête SQL pour créer l'entité
         * -getSqlInsertInto(entity) qui retourne la requête SQL pour insérer l'entité en base
         * -getSqlUpdate(entity) qui retourne la requête SQL pour mettre à jour l'entité en base
         */
        Object.assign(target, {
            getId(entity): any {
                return getId(entity);
            },
            getCreateSql(): string {
                return sqlCreate;
            },
            getSqlInsertInto(entity) {
                return getSqlInsertInto(entity);
            },
            getSqlUpdate(entity): string {
                return getSqlUpdate(entity);
            }
        });
    };
}
