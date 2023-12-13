class User {
    campaigns = [];
    characters = [];

    constructor(id, username, email, password, verification) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.verification = verification;
    }

    //est-ce que je dois faire des méthodes pour ajouter les campagnes et les personnages à l'utilisateur ?
}