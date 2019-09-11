import * as tslib_1 from "tslib";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
let MotifEntity = class MotifEntity {
};
tslib_1.__decorate([
    PrimaryGeneratedColumn({ name: 'id', type: 'number', comment: 'Id du motif' }),
    tslib_1.__metadata("design:type", Number)
], MotifEntity.prototype, "id", void 0);
tslib_1.__decorate([
    Column({
        name: 'code',
        type: 'string',
        comment: 'Code du motif de non distribution',
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], MotifEntity.prototype, "codeBarre", void 0);
tslib_1.__decorate([
    Column({
        name: 'libelle',
        type: 'string',
        comment: 'Libelle du motif de non distribution',
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], MotifEntity.prototype, "libelle", void 0);
MotifEntity = tslib_1.__decorate([
    Entity('motif')
], MotifEntity);
export { MotifEntity };
//# sourceMappingURL=motif.entity.js.map