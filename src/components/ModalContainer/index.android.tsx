import {useEffect, useRef} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Modal,
} from 'react-native';
import React from 'react';
import {Popup} from 'react-native-windows';

interface ModalContainerProps {
  visible: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ModalContainer = ({visible, children}: ModalContainerProps) => {
  const opacity = useRef(new Animated.Value(0)).current; // Opacity state

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 50);
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, opacity]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <Animated.View style={[styles.container, {opacity}]}>
        <View style={styles.modalContent}>{children}</View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default ModalContainer;
