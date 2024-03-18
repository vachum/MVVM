// Třída reprezentující uživatelský model
class UserModel {
  // Konstruktor inicializuje prázdné pole pro uživatele
  constructor() {
    this.users = [];
  }

  // Metoda pro získání seznamu uživatelů
  getUsers() {
    return this.users;
  }

  // Metoda pro přidání uživatele s kontrolou duplicity ID
  addUser(user) {
    // Kontrola duplicity ID
    const isDuplicateId = this.users.some(
      (existingUser) => existingUser.id === user.id
    );

    // Pokud je ID duplicity, vygenerovat nové unikátní ID
    if (isDuplicateId) {
      user.id = this.generateUniqueId();
    }

    // Přidání uživatele do pole
    this.users.push(user);
  }

  // Metoda pro odstranění uživatele podle ID
  removeUser(userId) {
    // Filtruje uživatele na základě jejich ID
    this.users = this.users.filter((user) => user.id !== userId);
  }

  // Metoda pro aktualizaci uživatele podle ID s kontrolou duplicity nového ID
  updateUser(userId, updatedUser) {
    // Kontrola duplicity ID pro aktualizovaného uživatele
    const isDuplicateId = this.users.some(
      (existingUser) => existingUser.id === updatedUser.id
    );

    // Pokud je ID duplicity, vygenerovat nové unikátní ID
    if (isDuplicateId) {
      updatedUser.id = this.generateUniqueId();
    }

    // Aktualizace uživatele v poli
    this.users = this.users.map((user) =>
      user.id === userId ? { ...user, ...updatedUser } : user
    );
  }

  // Metoda pro generování nového unikátního ID
  generateUniqueId() {
    // Generování nového unikátního ID (pouze jednoduchý příklad, můžete použít robustnější algoritmy)
    return Date.now() + Math.floor(Math.random() * 1000);
  }
}

// Export třídy UserModel pro použití v jiných modulech
export default UserModel;
