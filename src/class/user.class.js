class User {
  campaigns = [];
  characters = [];

  constructor(id, username, email, password, role, created_at, validated) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
		this.role = role;
		this.created_at = created_at;
		this.validated = validated;
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

	getCreatedAt() {
		return this.created_at;
	}

	getValidated() {
		return this.validated;
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