// Import potřebných knihoven a ikon z Reactu
import React, { useState, useEffect } from "react";
import {
  HiOutlineTrash,
  HiOutlinePencil,
  HiUser,
  HiOutlineCheck,
  HiOutlineX,
  HiSearch,
} from "react-icons/hi";

// Funkční komponenta pro zobrazení uživatelů a interakci s nimi
const UserView = ({
  users,
  onAddUserClick,
  onRemoveUserClick,
  onUpdateUserClick,
}) => {
  // Stavové proměnné pro přidání nového uživatele
  const [newUserName, setNewUserName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");

  // Stavové proměnné pro aktualizaci existujícího uživatele
  const [updateUserName, setUpdateUserName] = useState("");
  const [updateUserLastName, setUpdateUserLastName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [usrId, setUsrId] = useState(0);

  // Stavová proměnná pro vyhledávání
  const [res, setRes] = useState("");

  // Funkce pro přidání nového uživatele
  const handleAddUserClick = () => {
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      lastName: newUserLastName,
    };
    onAddUserClick(newUser);
    // Resetování stavů
    setNewUserName("");
    setNewUserLastName("");
  };

  // Funkce pro zahájení procesu aktualizace
  const handleUpdateUserClick = (user) => {
    if (!isUpdating) {
      setIsUpdating(true);
      setUpdateUserName(user.name);
      setUpdateUserLastName(user.lastName);
      setUsrId(user.id);
    }
  };

  // Funkce pro zrušení procesu aktualizace
  const handleCancelUpdateClick = () => {
    setIsUpdating(false);
    // Resetování stavů
    setUpdateUserName("");
    setUpdateUserLastName("");
    setUsrId(0);
  };

  // Funkce pro potvrzení aktualizace
  const handleConfirmUpdateClick = () => {
    const user = {
      id: users[usrId - 1].id,
      name: updateUserName,
      lastName: updateUserLastName,
    };
    onUpdateUserClick(users[usrId - 1].id, user);
    // Resetování vstupních polí pro aktualizaci a id uživatele po potvrzení
    setIsUpdating(false);
    setUpdateUserName("");
    setUpdateUserLastName("");
    setUsrId(0);
  };

  return (
    <div className="wrapper">
      <div className="list">
        {/* Vyhledávací pole */}
        <div className="search-container">
          <HiSearch size={35} />
          <input
            className="search"
            type="text"
            placeholder="Vyhledávání"
            onChange={(e) => setRes(e.target.value)}
          />
        </div>

        <h1>Uživatelé</h1>

        {/* Zobrazení uživatelů */}
        {users.map((user) => (
          <div
            className={
              user.name.toLowerCase().includes(res.toLocaleLowerCase()) ||
              user.lastName.toLowerCase().includes(res.toLocaleLowerCase())
                ? "userCard"
                : "noCard"
            }
            key={user.id}
          >
            <div className="userpart">
              <div className="avatar">
                <HiUser size={30} />
              </div>
              <h3>
                {user.name} {user.lastName}
              </h3>
            </div>
            {isUpdating && usrId === user.id && (
              // Formulář pro aktualizaci uživatele
              <div className="edit-container">
                <div className="">
                  <input
                    type="text"
                    value={updateUserName}
                    onChange={(e) => setUpdateUserName(e.target.value)}
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    value={updateUserLastName}
                    onChange={(e) => setUpdateUserLastName(e.target.value)}
                  />
                </div>
                {/* Tlačítka pro potvrzení nebo zrušení aktualizace */}
                <button className="confirm" onClick={handleConfirmUpdateClick}>
                  <HiOutlineCheck size={20} />
                </button>
                <button className="cancel" onClick={handleCancelUpdateClick}>
                  <HiOutlineX size={20} />
                </button>
              </div>
            )}
            {!isUpdating && (
              // Tlačítka pro odstranění a aktualizaci uživatele
              <div className="btns">
                <button
                  className="remove"
                  onClick={() => onRemoveUserClick(user.id)}
                >
                  <HiOutlineTrash size={20} />
                </button>
                <button
                  className="update"
                  onClick={() => handleUpdateUserClick(user)}
                >
                  <HiOutlinePencil size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Formulář pro přidání nového uživatele */}
      <div className="AddUser-container">
        <div className="avatar">
          <HiUser size={40} />
        </div>
        <div className="inpt-container">
          <input
            type="text"
            placeholder="Jméno"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </div>
        <div className="inpt-container">
          <input
            type="text"
            placeholder="Příjmení"
            value={newUserLastName}
            onChange={(e) => setNewUserLastName(e.target.value)}
          />
        </div>
        {/* Tlačítko pro přidání nového uživatele */}
        <button className="add" onClick={handleAddUserClick}>
          <HiUser size={25} /> Přidat uživatele
        </button>
      </div>
    </div>
  );
};

// Export komponenty pro použití v jiných modulech
export default UserView;
