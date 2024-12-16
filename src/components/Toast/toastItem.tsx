import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';

interface ToastItemProps {
  message: string | JSX.Element;
  type: 'error' | 'success' | 'warning' | 'info';
  title: string;
}

const ToastItem: React.FC<ToastItemProps> = ({
  title,
  message,
  type = 'info',
}: {
  message: string | JSX.Element;
  title?: string;
  type: 'error' | 'success' | 'warning' | 'info';
}) => {
  const style = styles();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1800,
      delay: 200,
      useNativeDriver: false, // `useNativeDriver: false` is required when animating non-transform properties
    }).start();
  }, [progress]);

  const progressInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  });

  const windowWidth = Dimensions.get('window').width;

  return (
    <View
      style={[
        style.container,
        {
          width: windowWidth - 64,
        },
      ]}>
      {title && <Text style={style.title}>{title}</Text>}
      {message && <Text style={style.message}>{message}</Text>}
      <View style={style.progressBarBackground}>
        <Animated.View
          style={[style.progressBar, {width: progressInterpolate}, style[type]]}
        />
      </View>
    </View>
  );
};

const styles = () => {
  return StyleSheet.create({
    container: {
      maxWidth: 440,
      backgroundColor: '#1C1C1E', // Dark background
      borderRadius: 8,
      justifyContent: 'center',
      paddingLeft: 16,
      height: 90,
      flex: 1,
      alignItems: 'center',
      marginTop: 10,
      zIndex: 101,
    },
    title: {
      fontSize: 14,
      color: '#F2F2F7', // Light text color for contrast
      fontWeight: 'bold',
    },
    error: {
      backgroundColor: '#E57373',
    },
    success: {
      backgroundColor: '#66BB6A',
    },
    warning: {
      backgroundColor: '#FFA726',
    },
    info: {
      backgroundColor: '#42A5F5',
    },
    progressBarBackground: {
      height: 10,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#2C2C2E',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    progressBar: {
      height: 10,
      borderRadius: 10,
    },
    message: {
      color: '#F2F2F7',
    },
  });
};

export default ToastItem;
