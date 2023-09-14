import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { useRealm, useQuery as useRealmQuery } from '@realm/react';
import { GetMeQuery, LoginMutation, SYNC_DATA } from '@src/apollo/queries/backend-queries';
import { UserModal } from '@src/realm/models/UserModal';
import { useEffect, useState } from 'react';
import { ApolloError } from '@apollo/client/errors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '@src/types/UserType';
import { setLogout, setUserData } from '@src/redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useCloudData } from '../data/useCloudData';

export const useSalesWalaUser = () => {
  const users = useRealmQuery(UserModal);
  const [isLoading, setLoading] = useState(true);

  const { syncCloudData } = useCloudData()
  const [user, setUser] = useState<UserModal | null>(
    users.length > 0 ? users[0] : null,
  );
  const [performLoginMutation] = useMutation(LoginMutation, {
    errorPolicy: 'all',
  });

  const [syncData] = useLazyQuery(SYNC_DATA, {
    errorPolicy: 'all',
  })
  const realm = useRealm();
  const dispatch = useDispatch();
  const { refetch: refetchMe } = useQuery(GetMeQuery, { errorPolicy: 'all' });

  const addOrUpdateUser = async (userData: UserType) => {
    if (users.length == 0) {
      realm.write(() => {
        realm.create('User', userData);
      });
    } else {
      realm.write(() => {
        users[0].createdAt = userData.createdAt;
        users[0].updatedAt = userData.updatedAt;
        users[0].email = userData.email;
        users[0].lastname = userData.lastname;
        users[0].firstname = userData.firstname;
        users[0].isEnabled = userData.isEnabled;
        users[0].id = userData.id;
        users[0].isVerified = userData.isVerified;
        if (userData.metadata) {
          users[0].metadata = userData.metadata;
        }
      });
    }
  };

  const loadMe = async () => {
    try {
      const meResp = await refetchMe();
      if (meResp.errors && meResp.errors?.length > 0) {
        if (meResp.errors[0].message === 'Unauthorized') {
          await performLogout();
          return;
        }
      }
      const myData = meResp.data.me;

      //todo
      const _user = {
        ...myData,
        isEnabled: true,
        isVerified: true,
      };
      delete _user.__typename;
      await addOrUpdateUser(_user);
      setUser(_user);
    } catch (err) {
      console.error('saaasasas', err);
    }
  };

  const performLogin = async (email: string, password: string) => {
    const loginResp = await performLoginMutation({
      variables: {
        email,
        password,
      },
    });

    if (loginResp.errors) {
      if (loginResp.errors.length > 0) {
        console.log(loginResp.errors);

        //@ts-ignore
        if (Array.isArray(loginResp.errors[0].extensions.originalError.message)) {
          // @ts-ignore
          throw new Error(loginResp.errors[0].extensions.originalError.message[0],
          );
        } else {
          // @ts-ignore
          throw new Error(loginResp.errors[0].extensions.originalError.message);
        }
      } else {
        throw new Error('Failed! try again');
      }
    } else {
      const accessToken = loginResp.data.login.accessToken;
      const refreshToken = loginResp.data.login.refreshToken;
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await syncDataFromServer()
    }
  };






  const syncDataFromServer = async () => {
    try {
      await syncCloudData()
    } catch (err) {
      console.error("syncDataFromServererr", err)
    }



  }

  const performLogout = async () => {
    realm.write(async () => {
      try {
        // if (users.length > 0) {
        //   realm.delete(users[0]);
        // }
        realm.deleteAll()
        await AsyncStorage.clear();
      } catch (err) { }

      setUser(null);
      dispatch(setLogout());
    });
  };

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(setUserData({ ...user }));
    }
  }, [user]);

  useEffect(() => {
    setLoading(false);
    setUser(users.length > 0 ? users[0] : null);
  }, [users]);

  return {
    user,
    isLoading,
    performLogin,
    performLogout,
  };
};
