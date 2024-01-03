class Character {
  campaigns = [];

  constructor(id, first_name, last_name, age, gender, creator) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
    this.gender = gender;
    this.creator = creator;
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

  getCreator() {
    return this.creator;
  }

  addCampaign(campaign) {
    this.campaigns.push(campaign);
  }
}

module.exports = Character;