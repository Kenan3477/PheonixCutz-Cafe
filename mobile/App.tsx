import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BookScreen } from "./src/BookScreen";
import { ChairScreen } from "./src/ChairScreen";
import { colors } from "./src/theme";

export default function App() {
  const [tab, setTab] = useState<"book" | "chair">("book");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      {tab === "book" ? <BookScreen /> : <ChairScreen />}
      <View style={styles.tabs}>
        <Pressable
          onPress={() => setTab("book")}
          style={[styles.tab, tab === "book" && styles.tabOn]}
        >
          <Text style={[styles.tabText, tab === "book" && styles.tabTextOn]}>
            Book
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTab("chair")}
          style={[styles.tab, tab === "chair" && styles.tabOn]}
        >
          <Text style={[styles.tabText, tab === "chair" && styles.tabTextOn]}>
            Yusuf
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.inkDeep,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },
  tabs: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.ink,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 999,
  },
  tabOn: { backgroundColor: colors.gold },
  tabText: { color: colors.cream, fontWeight: "700" },
  tabTextOn: { color: colors.ink },
});
