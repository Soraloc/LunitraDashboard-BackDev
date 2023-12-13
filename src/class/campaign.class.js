class Campaign {
  locations = [];
  characters = [];

  constructor(id, name, creator, game_master, created_at, image) {
    this.id = id;
    this.name = name;
    this.creator = creator;
    this.game_master = game_master;
    this.created_at = created_at;
    this.image = image;
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCreator() {
    return this.creator;
  }

  getGameMaster() {
    return this.game_master;
  }

  getCreatedAt() {
    return this.created_at;
  }

  getImage() {
    return this.image;
  }

  getLocations() {
    return this.locations;
  }

  addLocations(location) {
    this.locations.push(location);
  }

  addCharacter(character) {
    this.characters.push(character);
  }
}

module.exports = Campaign;