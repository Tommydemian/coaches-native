import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import React, { FC, ReactNode } from "react";

export type KeyboardAvoidingContainerType = {
  children: ReactNode;
};

export const KeyboardAvoidingContainer: FC<KeyboardAvoidingContainerType> = ({
  children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "red",
  },
  keyAvoid: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20
  },
});
