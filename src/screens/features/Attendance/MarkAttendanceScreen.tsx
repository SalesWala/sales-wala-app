import ScreenHeader from '@src/components/ScreenHeader';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import SalesWalaButton from '@src/components/SalesWalaButton';
import { useEffect, useRef, useState } from 'react';
import { useGetColor } from '@src/hooks/useTheme';
import { Camera, PhotoFile, useCameraDevices } from 'react-native-vision-camera';
import RetakeIcon from '@src/assets/svgs/RetakeIcon';
import ReverseIcon from '@src/assets/svgs/ReverseIcon'
import { useMutation } from '@apollo/react-hooks';
import { PUNCHINMutation } from '@src/apollo/queries/backend-queries';
import { useRealm } from '@realm/react';
import { useDispatch } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import { addAttendance } from '@src/redux/slices/attendanceSlice';






const MarkAttendanceScreen = () => {
  const camera = useRef<Camera>(null);
  const primaryColor = useGetColor('primary');
  const devices = useCameraDevices();
  const cameraFrontDevice = devices.front;
  const cameraBackDevice = devices.back;



  const [punchInMutation] = useMutation(PUNCHINMutation, {
    errorPolicy: 'all',
  });



  const realm = useRealm();


  //Todo remove this on production

  const dummyPhoto: PhotoFile = {
    path: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSUPobOTWGGkexkI3nf8u8LFP65DSHycLqi52PJLG0IDhOHSHHPSs1iJUW09LLdUcQiKnoF93mTYz7tDaQ",
    width: 12,
    height: 12,
    isRawPhoto: true,
    orientation: "portrait",
    isMirrored: true,

  }
  const [clickedPhoto, setClickedPhoto] = useState<PhotoFile | null>(dummyPhoto);
  const [isBackCamera, setBackCamera] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const loadPermissions = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();

    if (!cameraPermission || !microphonePermission) {
      const newCameraPermission = await Camera.requestCameraPermission();

      console.log({ newCameraPermission });
    }
  };
  const toast = useToast();
  const navigator = useNavigation();


  const dispatch = useDispatch();

  const addAtendanceToDB = (data: any) => {
    realm.write(() => {
      realm.create('Attendance', data);
      dispatch(addAttendance(JSON.stringify(data)));
      toast.show(`Successfully Punched In`, {
        type: 'success',
        placement: 'bottom',
        duration: 2000,
        animationType: 'slide-in',

      });
      navigator.goBack();
    });
  }
  const handleMarkAttendance = async () => {
    setLoading(true);
    try {
      const resp = await punchInMutation({
        variables: {
          metadata: JSON.stringify({})
        }
      })
      if (resp.errors) {
        //handle error todo
        console.log('handleMarkAttendance', JSON.stringify(resp.errors));
      } else {
        const data = resp.data.punchIn;

        delete data.__typename;
        addAtendanceToDB(data);
      }
    } catch (err) {
      console.log('dsdsdsdsd', err);
    }
    setLoading(false);
  };

  const renderCamera = () => {
    if (clickedPhoto) {
      return;
    }
    if (isBackCamera && cameraBackDevice) {
      return (
        <Camera
          device={cameraBackDevice}
          ref={camera}
          photo
          isActive={true}
          style={{
            height: 500,
          }}
        />
      );
    } else if (!isBackCamera && cameraFrontDevice) {
      return (
        <Camera
          device={cameraFrontDevice}
          ref={camera}
          photo
          isActive={true}
          style={{
            height: 500,
          }}
        />
      )
    }
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  const handleRetake = async () => {
    setClickedPhoto(null);
  };

  const handleReverseCamera = async () => {
    setBackCamera(!isBackCamera);
  };

  const handleCapture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto({});
      setClickedPhoto(photo);
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ScreenHeader title="Punch In" />

      <ScrollView
        style={{
          marginHorizontal: 18,
        }}>
        {renderCamera()}

        {clickedPhoto && (
          <Image
            source={{ uri: clickedPhoto.path }}
            style={{
              // width: 500,
              height: 500,
              borderRadius: 50,
            }}
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            paddingHorizontal: 25,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                handleRetake();
              }}
              style={{
                borderWidth: 3,

                borderColor: primaryColor,
                borderRadius: 100,
                height: 60,
                width: 60,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <RetakeIcon
                strokeWidth={4}
                stroke={primaryColor}
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                handleCapture();
              }}
              style={{
                borderWidth: 3,
                flex: 1,
                borderColor: primaryColor,
                borderRadius: 100,
                height: 80,
                width: 80,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: primaryColor,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                handleReverseCamera();
              }}
              style={{
                borderWidth: 3,

                borderColor: primaryColor,
                borderRadius: 100,
                height: 60,
                width: 60,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <ReverseIcon
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {clickedPhoto && (
        <View
          style={{
            marginHorizontal: 30,
            marginBottom: 10,
          }}>
          <SalesWalaButton
            color={primaryColor}
            fontWeight="600"
            isLoading={isLoading}
            text={'Punch In'}
            onPress={handleMarkAttendance}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MarkAttendanceScreen
