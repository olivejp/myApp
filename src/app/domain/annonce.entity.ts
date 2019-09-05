export class Categorie {
    id: number;
    libelle: string;
}

export class User {
    email: string;
    profile: string;
    uuid: string;
}

export class Annonce {
    categorie: Categorie;
    contactEmail: boolean;
    contactMsg: boolean;
    contactTel: boolean;

    datePublication: number;
    dateRelance: number;
    description: string;
    photos: string[];
    prix: number;
    titre: string;
    uuid: string;
    utilisateur: User;
}
