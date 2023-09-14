import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import SalesWalaText from '../SalesWalaText/SalesWalaText';
import {useGetColor} from '@src/hooks/useTheme';

export type MenuType = {
  title: string;
  action: () => void;
  isDanger?: boolean;
  onClose?: () => void;
};

interface MenuModalProps {
  menuItems: MenuType[];
  isVisible: boolean;
  onClose: () => void;
}

const OneMenuItem = (props: MenuType) => {
  const textColor = props.isDanger
    ? useGetColor('danger')
    : useGetColor('primary');

  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {

        if (props.onClose) {
          props.onClose();
        }
        props.action();
      }}>
      <SalesWalaText fontSize={15} fontWeight="500" color={textColor}>
        {props.title}
      </SalesWalaText>
    </TouchableOpacity>
  );
};

const MenuModal = ({menuItems, isVisible, onClose}: MenuModalProps) => {
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}>
        <View style={styles.modalContent}>
          {menuItems.map((item, index) => {
            return <OneMenuItem {...item} key={index} onClose={onClose} />;
          })}

          <OneMenuItem title="Close Menu" action={onClose} isDanger />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgba(172, 165, 172, 1)',
  },
});

export default MenuModal;
