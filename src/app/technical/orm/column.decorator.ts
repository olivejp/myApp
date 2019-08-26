import {ColumnDefinition} from './column-definition';
import {SQLiteType} from './sqlite-type';

function mapSqlResultToEntity(entity: any, sqlResult: any): any {
    const objet = {};
    const columns = Object.getPrototypeOf(entity)[`columns`];
    for (const entry of columns.entries()) {
        const key: string = entry[0];
        const value: ColumnDefinition = entry[1];
        if (sqlResult[value.name]) {
            objet[key] = sqlResult[value.name];
        }
    }
    return Object.assign(entity, objet);
}

function setId(entity: any, id: any) {
    const columns = Object.getPrototypeOf(entity)[`columns`];
    for (const entry of columns.entries()) {
        const key: string = entry[0];
        const value: ColumnDefinition = entry[1];
        if (value.primary) {
            entity[key] = id;
            break;
        }
    }
}

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

function getSqlUpdate(entity: any): string {
    const columns = Object.getPrototypeOf(entity)[`columns`];
    const tableName = Object.getPrototypeOf(entity)[`tableName`];
    let sqlUpdate: string = 'UPDATE ' + tableName + ' SET ';
    let idValue;
    let idColumnName;
    for (const entry of columns.entries()) {
        const key: string = entry[0];
        const value: ColumnDefinition = entry[1];

        // Get the id
        if (value.primary) {
            idValue = entity[key];
            idColumnName = value.name;
        }

        // Concatenate UPDATE query
        if (entity[key] && !value.primary) {
            sqlUpdate = sqlUpdate + ' ' + value.name + ' = ' + ((value.type === SQLiteType.TEXT) ? '\'' + entity[key] + '\'' : entity[key]);
            sqlUpdate += ', ';
        }
    }
    sqlUpdate = sqlUpdate.substring(0, sqlUpdate.length - 2);
    sqlUpdate += ' WHERE ' + idColumnName + ' = ' + idValue + ';';
    console.log(sqlUpdate);
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
    console.log(sqlInsert);
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

        /**
         * Ajout dans le prototype de l'objet des méthodes :
         * -getId(entity) qui permet de récupérer l'Id de l'entité
         * -getSqlInsertInto(entity) qui retourne la requête SQL pour insérer l'entité en base
         * -getSqlUpdate(entity) qui retourne la requête SQL pour mettre à jour l'entité en base
         */
        Object.assign(target, {
            setId(entity: any, id: any) {
                return setId(entity, id);
            },
            getId(entity): any {
                return getId(entity);
            },
            getSqlInsertInto(entity) {
                return getSqlInsertInto(entity);
            },
            getSqlUpdate(entity): string {
                return getSqlUpdate(entity);
            },
            mapSqlResultToEntity(entitySample, entity): any {
                return mapSqlResultToEntity(entitySample, entity);
            }
        });
    };
}
