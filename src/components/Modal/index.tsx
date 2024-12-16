import {Button} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  DimensionValue,
  Text,
} from 'react-native';
import ModalContainer from '../ModalContainer';

interface ModalProps {
  visible: boolean;
  title?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  maxHeight?: DimensionValue;
  onOk?: () => void;
  onCancel?: () => void;
  cancelButtonTxt?: string;
  disableClose?: boolean;
  isLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  width = 500,
  height = 500,
  maxHeight,
  onOk,
  onCancel,
  isLoading = false,
}) => {
  const [containerWidth, setWidth] = useState(Dimensions.get('window').width);
  const [containerHeight, setHeight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const onChange = () => {
      setWidth(Dimensions.get('window').width);
      setHeight(Dimensions.get('window').height);
    };
    const dimensionSubscription = Dimensions.addEventListener(
      'change',
      onChange,
    );
    return () => {
      dimensionSubscription.remove();
    };
  }, []);

  const {
    modalBackgroundStyle,
    modalWrapperStyle,
    modalTitleContainerStlye,
    titleStyle,
    footer,
    bodyStyle,
  } = styles();

  const tempContainerHeight = containerHeight - 64;

  const tempContainerWidth = containerWidth - 64;

  return (
    <ModalContainer visible={visible}>
      <View
        style={[
          modalBackgroundStyle,
          {width: containerWidth, height: containerHeight},
        ]}>
        <View
          style={[
            modalWrapperStyle,
            {width: width > tempContainerWidth ? tempContainerWidth : width},
            {
              height:
                height > tempContainerHeight ? tempContainerHeight : height,
            },
            {maxHeight: maxHeight ?? null},
          ]}>
          <View style={modalTitleContainerStlye}>
            <Text style={titleStyle}>{title}</Text>
          </View>

          <View style={bodyStyle}>{children}</View>
          <View style={footer}>
            <Button title={'Cancel'} onPress={onCancel} type="outline" />
            <Button
              loading={isLoading}
              loadingProps={{
                size: 'small',
                color: 'rgba(111, 202, 186, 1)',
              }}
              loadingStyle={{
                height: 22,
              }}
              buttonStyle={{
                borderWidth: 0,
              }}
              containerStyle={{
                width: 160,
                marginLeft: 16,
              }}
              title={'Confirm'}
              onPress={onOk}
            />
          </View>
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = () =>
  StyleSheet.create({
    modalBackgroundStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.64)',
      width: '100%',
      height: '100%',
      display: 'flex',
    },
    modalWrapperStyle: {
      borderRadius: 10,
      backgroundColor: 'white',
      width: 500,
      height: 500,
    },
    titleStyle: {
      color: 'black',
      fontSize: 20,
      fontStyle: 'normal',
      lineHeight: 30,
    },
    modalTitleContainerStlye: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    bodyStyle: {
      padding: 16,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingVertical: 8,
      paddingHorizontal: 8,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      left: 0,
      right: 0,
      borderTopColor: 'rgba(0, 0, 0, 0.1)',
      borderTopWidth: 1,
    },
  });

export default Modal;
