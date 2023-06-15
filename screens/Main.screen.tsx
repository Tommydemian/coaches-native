import { useState, useEffect } from "react";
import type { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
// svg
import { Logo } from "../components/Logo";
// types:
import { MainStackParams } from '../navigation/MainStack'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from '../assets/colors'
// components 
import { KeyboardAvoidingContainer } from '../components/KeyboardAvoidingContainer'
import { CustomInput } from '../components/CustomInput'
// FORMIK------------------------------------------:
import { Formik } from "formik";
import * as Yup from "yup";
// Gql 
import { gql, useMutation } from "@apollo/client";

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStackParams } from "../navigation/AuthStack";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      token
    }
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type MainProps = NativeStackScreenProps<AuthStackParams, "Main">;

export const Main: FC<MainProps> = ({ navigation }) => {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: '' ,
      password: '' 
    }
  })

  // After Login is done => recieves data
  useEffect(() => {
    if (data && data.login && data.login.token) {
      const { token, _id } = data.login
      console.log(token, _id);
      
      
      const storeToken = async (val: string) => {
        try {
          await AsyncStorage.setItem('token', val)
        } catch (e: any) {
          console.error(e.message)
        }
      }

      storeToken(token)
      // in case you need the token later
      setToken(token)
      navigation.navigate('Home', {_id })
    }
  }, [data])

  const togglePasswordVisibility = () => {
    setSeePassword(!seePassword)
  }

  return (
    <KeyboardAvoidingContainer>
       <Formik
       // keep track of all the initial values
       initialValues={{ email: '', password: '' }}
       validationSchema={validationSchema}
       onSubmit={ values => {
        login({variables: { email: values.email, password: values.password }}) 
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
        <>
        <View style={styles.contentContainer}>
          <Logo />
        </View>

        <Text style={styles.headingText}>sign in</Text>
        <View style={styles.formContainer}>
          <CustomInput
            text="Email"
            placeholder="jonhdoe@gmail.com"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            keyboardType="email-address"
            withIcon={false}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          
          <CustomInput
            text="Password"
            placeholder="password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            keyboardType="default"
            withIcon={true}
            iconName="eye-sharp"
            secureTextEntry={seePassword}
            handleIconPress={togglePasswordVisibility}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          
        </View>

        <View>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </>
         
       )}
     </Formik>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    borderColor: colors.red,
    borderWidth: 1,
    borderStyle: "solid",
  },
  contentContainer: {
    marginTop: "25%",
  },
  headingText: {
    fontFamily: "Poppins400",
    textTransform: "capitalize",
    fontSize: 30,
    textAlign: "center",
    paddingVertical: 20,
  },
  actionButton: {
    backgroundColor: "hsl(342, 100%, 50%)",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    // elevation: 10, 
    // shadowOffset: {
    //       width: 2, 
    //       height: 1
    //   },
    //   shadowColor: '#000', 
    //   shadowOpacity: 0.5, 
    //   shadowRadius: 7
  
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Poppins400", 
    textAlign: 'center'
  },
  formContainer: {
    marginVertical: 10,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: '400'
  }
  
});
