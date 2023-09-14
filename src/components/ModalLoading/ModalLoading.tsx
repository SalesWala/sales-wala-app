import React, {useEffect, useMemo, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import SalesWalaText from '../SalesWalaText/SalesWalaText';
import {useGetColor} from '@src/hooks/useTheme';
import LoadingSpinner from '../LoadingSpinner';

interface ModalLoadingProps {
  title: string;
  visible: boolean;
}

const ModalLoading = ({title, visible}: ModalLoadingProps) => {
  return (
    <View style={styles.container}>
      <Modal isVisible={visible}>
        <View style={styles.modalContent}>
          <LoadingSpinner />
          <SalesWalaText
            fontSize={14}
            fontWeight="400"
            style={{
              justifyContent: 'center',
              marginRight: 5,
              alignSelf: 'center',
            }}>
            {title}
          </SalesWalaText>
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
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    marginHorizontal: 50,
    borderRadius: 10,
  },
});

export default ModalLoading;
