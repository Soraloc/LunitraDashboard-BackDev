class User {
    campaigns = [];
    characters = [];

    constructor(id, username, email, password, role, verified, creationDate) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.verified = verified;
        this.creationDate = creationDate;
    }

    //est-ce que je dois faire des méthodes pour ajouter les campagnes et les personnages à l'utilisateur ?
}