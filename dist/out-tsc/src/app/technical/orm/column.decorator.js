import { SQLiteType } from './sqlite-type';
function mapSqlResultToEntity(entity, sqlResult) {
    const objet = {};
    const columns = Object.getPrototypeOf(entity)[`columns`];
    for (const entry of columns.entries()) {
        const key = entry[0];
        const value = entry[1];
        if (sqlResult[value.name]) {
            objet[key] = sqlResult[value.name];
        }
    }
    return Object.assign(entity, objet);
}
function setId(entity, id) {
    const columns = Object.getPrototypeOf(entity)[`columns`];
    for (const entry of columns.entries()) {
        const key = entry[0];
        const value = entry[1];
        if (value.primary) {
            entity[key] = id;
            break;
        }
    }
}
/**
 * Pour une entity donnée, cette méthode va retourner la valeur de son ID
 * @param entity: any
 */
function getId(entity) {
    const columns = Object.getPrototypeOf(entity)[`columns`];
    for (const entry of columns.entries()) {
        const key = entry[0];
        const value = entry[1];
        if (value.primary) {
            return entity[key];
        }
    }
    return undefined;
}
/**
 * Pour une entity donnée, cette méthode va retourner la requête UPDATE
 * @param entity: any
 */
function getSqlUpdate(entity) {
    const columns = Object.getPrototypeOf(entity)[`columns`];
    const tableName = Object.getPrototypeOf(entity)[`tableName`];
    let sqlUpdate = 'UPDATE ' + tableName + ' SET ';
    let idValue;
    let idColumnName;
    for (const entry of columns.entries()) {
        const key = entry[0];
        const value = entry[1];
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
/**
 * Pour une entity donnée, cette méthode va retourner la requête SQL INSERT INTO pour l'insérer en base.
 * @param entity: any
 */
function getSqlInsertInto(entity) {
    const columns = Object.getPrototypeOf(entity)[`columns`];
    const tableName = Object.getPrototypeOf(entity)[`tableName`];
    // noinspection SqlNoDataSourceInspection
    let sqlInsert = 'INSERT INTO ' + tableName + ' (';
    for (const entry of columns.entries()) {
        const key = entry[0];
        const value = entry[1];
        if (entity[key]) {
            sqlInsert += value.name + ', ';
        }
    }
    sqlInsert = sqlInsert.substring(0, sqlInsert.length - 2);
    sqlInsert += ') VALUES (';
    for (const entry of columns.entries()) {
        const key = entry[0];
        const value = entry[1];
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
/**
 * Function used as a decorator on Class properties
 * @param columnDefinition: ColumnDefinition
 */
export function Column(columnDefinition) {
    return (target, key) => {
        // Recherche ou création d'une propriété `columns` dans le prototype de la classe
        const accessor = `columns`;
        if (!target[accessor]) {
            target[accessor] = new Map();
        }
        const columnsMap = target[accessor];
        // Ajout dans la map de la nouvelle ColumnDefinition
        columnsMap.set(key, columnDefinition);
        /**
         * Ajout dans le prototype de l'objet des méthodes :
         * -getId(entity) qui permet de récupérer l'Id de l'entité
         * -getSqlInsertInto(entity) qui retourne la requête SQL pour insérer l'entité en base
         * -getSqlUpdate(entity) qui retourne la requête SQL pour mettre à jour l'entité en base
         */
        Object.assign(target, {
            setId(entity, id) {
                return setId(entity, id);
            },
            getId(entity) {
                return getId(entity);
            },
            getSqlInsertInto(entity) {
                return getSqlInsertInto(entity);
            },
            getSqlUpdate(entity) {
                return getSqlUpdate(entity);
            },
            mapSqlResultToEntity(entitySample, entity) {
                return mapSqlResultToEntity(entitySample, entity);
            }
        });
    };
}
//# sourceMappingURL=column.decorator.js.map