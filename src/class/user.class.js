class User {

  constructor(id, username, email, password, role, creationDate, verified, verifyToken, campaigns, characters) {
    this.id = id;
		this.username = username;
  	this.email = email;
  	this.password = password;
	  this.role = role;
    this.creationDate = creationDate;
	  this.verified = verified;
	  this.verifyToken = verifyToken;
  	this.campaigns = campaigns;
  	this.characters = characters;
  }

	getId() {
		return this.id;
	}

	getUsername() {
		return this.username;
	}

	getEmail() {
		return this.email;
	}

	getPassword() {
		return this.password;
	}

  getCreationDate() {
		return this.creationDate;
	}

	getVerified() {
		return this.verified;
	}

  getVerifyToken() {
    return this.verifyToken;
  }

	addCampaign(campaign) {
		this.campaigns.push(campaign);
	}

	addCharacter(character) {
		this.characters.push(character);
	}

	deleteCampaign(campaign) {
		this.campaigns = this.campaigns.filter(c => c !== campaign);
	}

	deleteCharacter(character) {
		this.characters = this.characters.filter(c => c !== character);
	}
}

module.exports = User;