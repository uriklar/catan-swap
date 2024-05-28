import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { createGame, joinGame } from "./db/db";
import { useState } from "react";
import { Asset, useAssets } from "expo-asset";

function Login({
  onSuccessfulLogin,
}: {
  onSuccessfulLogin: (gameId: string) => void;
}) {
  const [isJoining, setIsJoining] = useState(false);
  const [gameId, setGameId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [gameIdError, setGameIdError] = useState("");

  async function onJoinGameClick() {
    setGameIdError("");
    try {
      await joinGame(gameId, playerName);
      onSuccessfulLogin(gameId);
    } catch (e) {
      setGameIdError("Game not found");
      // handle error
      console.error(e);
    }
  }

  async function onCreateGameClick() {
    const gameId = await createGame();
    onSuccessfulLogin(gameId);
  }

  return (
    <View>
      <Button title="Create Game" onPress={onCreateGameClick} />

      <Button title="Join Game" onPress={() => setIsJoining(true)} />

      {isJoining && (
        <View>
          <Text>Enter Game ID (example: ABC123):</Text>
          <TextInput value={gameId} onChangeText={setGameId} />
          <Text>Enter Player Name:</Text>
          <TextInput value={playerName} onChangeText={setPlayerName} />
          <Button title="Join" onPress={onJoinGameClick} />
          {gameIdError && <Text>{gameIdError}</Text>}
        </View>
      )}
    </View>
  );
}

function Game({ gameId }: { gameId: string }) {
  const [assets, error] = useAssets([require("./assets/wood.jpeg")]);

  return (
    <View> 
      <Text>Game ID: {gameId}</Text>
      <Text>Image:</Text>
      {assets ? (
        // @ts-ignore
        <Image source={assets[0]} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

export default function App() {
  const [selectedScreen, setSelectedScreen] = useState<"login" | "game">(
    "game"
  );
  const [gameId, setGameId] = useState("ABC123");

  return (
    <View style={styles.container}>
      {selectedScreen === "login" && (
        <Login
          onSuccessfulLogin={(gameId) => {
            setSelectedScreen("game");
            setGameId(gameId);
          }}
        />
      )}
      {selectedScreen === "game" && <Game gameId={gameId} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
