import React, { FC, useRef } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface Props extends TextInputProps {
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const TextInput: FC<Props> = (props) => {
  const { style, error, ...otherProps } = props;

  const ref = useRef<RNTextInput>(null);

  const onPress = () => {
    ref.current?.focus();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputContainer} onPress={onPress}>
        <RNTextInput ref={ref} style={[styles.input, style]} {...otherProps} />
      </TouchableOpacity>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignSelf: "center",
    width: "80%",
  },
  inputContainer: {
    minHeight: 40,

    justifyContent: "center",

    paddingHorizontal: 8,
    paddingVertical: 4,

    borderColor: "gray",
    borderWidth: 1,
  },
  input: {
    margin: 0,
    padding: 0,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
