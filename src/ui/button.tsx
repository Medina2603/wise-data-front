import React from 'react';
import type { PressableProps } from 'react-native';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Definición de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    height: 50,
    width: 200,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginTop: 20,
  },
  buttonContainerPressed: {
    backgroundColor: '#874CCC',
    borderColor: '#874CCC',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonTextPressed: {
    color: 'white',
  },
});

interface Props extends PressableProps {
  label?: string;
  loading?: boolean;
}

export const Button = React.forwardRef<View, Props>(
  ({ label = 'Enviar', loading = false, onPress, ...props }, ref) => {
    const [pressed, setPressed] = React.useState(false);

    const handlePress = () => {
      setPressed(!pressed);
      if (onPress) {
        onPress();
      }
    };

    return (
      <View style={styles.container}>
        <Pressable
          onPress={handlePress}
          style={[
            styles.buttonContainer,
            pressed && styles.buttonContainerPressed,
          ]}
          {...props}
          ref={ref}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              style={[styles.buttonText, pressed && styles.buttonTextPressed]}
            >
              {pressed ? 'Enviado' : 'Enviar'}
            </Text>
          )}
        </Pressable>
      </View>
    );
  }
);

export default Button;
