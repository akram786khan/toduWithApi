import {openPicker, openCamera} from 'react-native-image-crop-picker';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TextInput,
  Image,
  PermissionsAndroid,
} from 'react-native';
import { DefaultTheme } from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';

export const captureImage = async (type, callback = () => {}) => {
  return new Promise(async (resolve, reject) => {
    let options = {
      //   mediaType: 'photo',
      //   height: 300,
      //   width: 300,
      //   quality: 1,
      mediaType: 'photo',
      cropping: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    var Camera = openPicker;
    if (isCameraPermitted && isStoragePermitted) {
      if (type == 'camera') {
        Camera = openCamera;
      }
      Camera({
        mediaType: 'photo',
        cropping: true,
        width: 500,
        height: 500,
      })
        .then(res => {
          console.log('uri -> ', res?.uri);
          console.log('type -> ', res?.type);
          console.log('fileName -> ', res?.fileName);

          var body = {
            name: res?.path,
            type: res?.mime,
            uri: res?.path,
          };
          resolve(body);
          return body;
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  } else return true;
};
