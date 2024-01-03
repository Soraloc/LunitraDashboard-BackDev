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

	getVerified() {
		return this.verified;
	}

	getCreationDate() {
		return this.creationDate;
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