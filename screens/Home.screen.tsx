import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteProp } from '@react-navigation/native';
import { MainStackParams } from '../navigation/MainStack'
//types
import { UserUI } from '../types/User'

interface GetUserResponse {
  getUser: UserUI;
}

// route declaration type
type ProfileScreenRouteProp = RouteProp<MainStackParams, 'Home'>;

// route as props
type ProfileProps = {
  route: ProfileScreenRouteProp;
};

const GET_USER = gql`
  query GetUser($id: String!) {
    getUser(_id: $id) {
      _id
      mobilePhone
      age
      bio
      birthDate
      email
      firstName
      gender
      isCoach
      lastName
      language
      location {
        _id
        coords
        name
      }
      photo
    }
  }
`;

export const Home: React.FC<ProfileProps> = ({ route }) => {
  const { _id } = route.params;
  const { loading, error, data } = useQuery<GetUserResponse>(GET_USER, {
    variables: { id: _id },
  });

  useEffect(() => {console.log(`/${data?.getUser.photo}`)}, [data] )
  
  return (
    <View style={styles.container}>
      {loading && <Text>loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {data && (
        <View style={styles.userCard}>
        {/* Complete user name */}
        <Text style={styles.headingText} >{data?.getUser.firstName} {data?.getUser.lastName}</Text>
        {/* Photo */}
        <Image
        style={{width: 400, height: 400}}
        source={{
          uri: `https://redpadel-dev-ui-files.s3.amazonaws.com/${data.getUser.photo}`

        }}
        />
        <Text style={{color: '#fff'}}> gender: {data.getUser.gender}</Text>
        <Text style={{color: '#fff'}}> location: {data.getUser.location?.name}</Text>
        <Text style={{color: '#fff'}}> Rating: {data.getUser.rating?  data.getUser.rating?.value : 'no rating assigned' }</Text>

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center',
  },
  headingText: {
    fontSize: 20, 
    fontWeight: '600',
    marginBottom: 10, 
    color: '#fff',
  },
  userCard: {
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#ff6700',
    padding: 15, 
    borderRadius: 10
  }, 
  image: {
    height: 200,
    borderColor: '#fff',
    borderStyle: 'solid', 
    borderWidth: 1,
  }, 
  userName: {
    color: '#fff',
  }
});