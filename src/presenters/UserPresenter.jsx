// Import potřebných knihoven a komponent
import React, { useState, useEffect } from "react";
import UserModel from "../models/UserModel";
import UserView from "../views/UserView";

// Funkční komponenta pro správu uživatelů
const UserPresenter = () => {
  // Stavová proměnná pro uživatele, inicializovaná načtením ze storage
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  // Effect hook pro ukládání uživatelů do localStorage při změně users
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Funkce pro přidání nového uživatele
  const handleAddUserClick = (newUser) => {
    // Kontrola duplicity ID
    const isDuplicateId = users.some(
      (existingUser) => existingUser.id === newUser.id
    );

    // Generování nového unikátního ID, pokud je ID duplicity
    if (isDuplicateId) {
      newUser.id = generateUniqueId();
    }

    // Kontrola, zda jméno a příjmení nového uživatele nejsou prázdné
    if (newUser.name !== "" && newUser.lastName !== "") {
      // Přidání nového uživatele do modelu a aktualizace stavu
      new UserModel().addUser(newUser);
      setUsers([...users, newUser]);
    } else {
      // Upozornění, pokud je jméno nebo příjmení prázdné
      alert("Jméno nebo příjmení nemůže být prázdné");
    }
  };

  // Funkce pro odstranění uživatele
  const handleRemoveUserClick = (userId) => {
    // Odstranění uživatele z modelu a aktualizace stavu
    new UserModel().removeUser(userId);
    setUsers(users.filter((user) => user.id !== userId));
  };

  // Funkce pro aktualizaci uživatele
  const handleUpdateUserClick = (userId, updatedUser) => {
    // Kontrola duplicity ID
    const isDuplicateId = users.some(
      (existingUser) => existingUser.id === updatedUser.id
    );

    // Generování nového unikátního ID, pokud je ID duplicity
    if (isDuplicateId) {
      updatedUser.id = generateUniqueId();
    }

    // Aktualizace uživatele v modelu a aktualizace stavu
    new UserModel().updateUser(
      updatedUser.id,
      updatedUser.name,
      updatedUser.lastName
    );
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      )
    );
  };

  // Funkce pro generování nového unikátního ID
  const generateUniqueId = () => {
    // Generování nového unikátního ID (pouze jednoduchý příklad, můžete použít robustnější algoritmy)
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  // Vykreslení komponenty UserView s předanými vlastnostmi a funkcemi
  return (
    <div>
      <UserView
        users={users}
        onAddUserClick={handleAddUserClick}
        onRemoveUserClick={handleRemoveUserClick}
        onUpdateUserClick={handleUpdateUserClick}
      />
    </div>
  );
};

// Export komponenty pro použití v jiných modulech
export default UserPresenter;
