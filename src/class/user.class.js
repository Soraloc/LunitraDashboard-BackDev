class User {
	constructor(user) {
		this.id = user._id;
		this.username = user.username;
  	this.email = user.email;
  	this.password = user.password;
	  this.role = user.role;
    this.creationDate = user.creationDate;
	  this.verified = user.verified;
	  this.verifyToken = user.verifyToken;
  	this.campaigns = user.campaigns;
  	this.characters = user.characters;
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