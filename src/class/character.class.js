class Character {
  campaigns = [];

  constructor(character) {
    this.id = character._id;
    this.first_name = character.first_name;
    this.last_name = character.last_name;
    this.age = character.age;
    this.gender = character.gender;
    this.physical_description = character.physical_description;
    this.mental_description = character.mental_description;
    this.background = character.background;
    this.image = character.image;
    this.gallery = character.gallery;
    this.creator = character.creator;
  }

  getId() {
    return this.id;
  }

  getFirstName() {
    return this.first_name;
  }

  getLastName() {
    return this.last_name;
  }

  getAge() {
    return this.age;
  }

  getGender() {
    return this.gender;
  }

  getPhysicalDescription() {
    return this.physical_description;
  }

  getMentalDescription() {
    return this.mental_description;
  }

  getBackground() {
    return this.background;
  }

  getImage() {
    return this.image;
  }

  getGallery() {
    return this.gallery;
  }

  getCreator() {
    return this.creator;
  }

  addCampaign(campaign) {
    this.campaigns.push(campaign);
  }
}

module.exports = Character;