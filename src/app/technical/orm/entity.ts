export function Entity(tableName: string): any {
    return (target) => {

        // On rajoute une propriété `tableName` dans le prototype de la classe Entity
        const accessor = `tableName`;
        if (!target.prototype[accessor]) {
            target.prototype[accessor] = tableName;
        }

        // Ajout d'une méthode pour récupérer le nom de la table
        Object.assign(target.prototype, {
            getTableName(): string {
                return tableName;
            }
        });
    };
}
