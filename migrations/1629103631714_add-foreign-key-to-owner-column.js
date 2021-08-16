/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat user baru untuk menampung notes dengan owner kosong
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes', 'old_notes')");

  // mengubah nilai owner pada not yang owner-nya bernilai NULL
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner = NULL");

  // memberikan constraint foreignKey pada ownner therhadap kolom id dari tabel user
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_notes.owners_users.id pada tabel notes
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // mengubah nilai owner old_notes pada note menjadi NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // menghapus user baru
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
