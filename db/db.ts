import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { firebaseConfig } from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function generateID() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export async function createGame() {
  // Add a new document with a generated id.
  const id = generateID();

  await setDoc(doc(db, "games", id), {});

  return id;
}

export async function joinGame(gameId: string, playerName: string) {
  // Create a reference to the game document
  const gameDocRef = doc(db, "games", gameId.replaceAll(" ", "").toUpperCase());

  // Check if the game document exists
  const gameDoc = await getDoc(gameDocRef);
  if (!gameDoc.exists()) {
    console.log("No such game exists!");
    throw new Error("Game not found");
  } else {
    await updateDoc(gameDocRef, {
      players: arrayUnion({ name: playerName, cards: {} }),
    });

    return true;

    console.log("Player added to game with ID: ", gameId);
  }
}

export default db;
