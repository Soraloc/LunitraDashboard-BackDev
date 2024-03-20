class Location {
  gallery = [];

  constructor(id, name, description, created_at, image) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.image = image;
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getCreatedAt() {
    return this.created_at;
  }

  getImage() {
    return this.image;
  }

  getGallery() {
    return this.gallery;
  }

  addImages(image) {
    this.gallery.push(image);
  }
}

module.exports = Location;