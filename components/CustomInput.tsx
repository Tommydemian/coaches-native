import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";

type CustomInputProps = {
  text: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  withIcon: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
  handleIconPress?: () => void;
  onBlur: (e: any) => void;
  isEmail?: boolean;
};

export const CustomInput: FC<CustomInputProps> = ({
  text,
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onChangeText,
  withIcon,
  iconName,
  handleIconPress,
  onBlur,
}) => {
  return (
    <>
      <Text style={styles.inputLabel}>{text}</Text>
      <View
        style={[styles.inputContainer, withIcon ? styles.inputWithIcon : null]}
      >
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
        />
        {withIcon ? (
          <Ionicons
            name={iconName}
            size={40}
            color="#ccc"
            onPress={handleIconPress}
          />
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 20,
  },
  inputWithIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    textTransform: "capitalize",
    color: "hsl(342, 100%, 50%)",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    paddingVertical: 0, // Android case
  },
});
