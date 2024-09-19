import React, { FC, ComponentProps } from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface Props extends ComponentProps<typeof RNPickerSelect> {
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Picker: FC<Props> = (props) => {
  const { error, onFocus, onBlur, ...otherProps } = props;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <RNPickerSelect {...otherProps} onOpen={onFocus} onClose={onBlur} />
      </View>

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
