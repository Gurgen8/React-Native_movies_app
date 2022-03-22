import React, { Fragment } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllFavouriteList, removeFavouriteListItem } from "../redux/ListSlice"
const IMAGE_API: string = "https://image.tmdb.org/t/p/w1280";
const Nocover = require('../assets/img/nocover.jpg');

const FavoriteList = () => {
  const favouriteFilms = useSelector((state: any) => state.FavouriteList)
  const dispatch = useDispatch<any>()
  const renderItem = ({ item }: any | number | string) => {
    return (<View style={styles.item} >
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.img} source={item.poster_path ? { uri: IMAGE_API + item.poster_path } : Nocover} />
      <Text style={styles.desc}>{item.overview}</Text>
      <View style={styles.footerItem}>
        <Text style={styles.votes}> <AntDesign name="star" size={30} color={"gold"} /> {item.vote_average}</Text>
        <TouchableHighlight activeOpacity={0.4} onPress={() => { item.favourite = false; return dispatch(removeFavouriteListItem(item.id)) }} underlayColor="red" style={styles.removeBtn}>
          <Text style={styles.rmBtnText}>REMOVE</Text>
        </TouchableHighlight>
      </View>
    </View>)
  }
  return (
    <SafeAreaView style={styles.container} >
      {favouriteFilms?.length ?
        <Fragment>
          <TouchableHighlight activeOpacity={0.1} underlayColor="red" onPress={() => dispatch(removeAllFavouriteList(favouriteFilms))}>
            <Text style={styles.removeIcon}><AntDesign name="delete" size={30} /></Text>
          </TouchableHighlight>
          <FlatList
            data={favouriteFilms}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
          />
        </Fragment>
        : <View style={styles.emptyContainer}>
          <Text style={styles.heartIcon}><AntDesign name="heart" size={30} /> List is empty...</Text>
        </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF5E6"
  },
  item: {
    backgroundColor: '#001333',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  emptyContainer: {
    paddingTop: "50%"
  },
  img: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    color: "white",
    marginBottom: 10,
    fontSize: 22
  },
  desc: {
    fontSize: 16,
    color: "white",
    textAlign: "center",

  },
  removeIcon: {
    backgroundColor: "white",
    marginTop: 2,
    color: "red",
    textAlign: "center"
  },
  footerItem: {
    marginTop: 10,
    flexDirection: "row"
  },
  votes: {
    color: "violet",
    fontSize: 24,
    fontWeight: "900",
    flex: 1
  },
  removeBtn: {
    backgroundColor: "violet",
    color: "white",
    paddingTop: 6,
    width: 100,
    borderRadius: 10,
    paddingLeft: 22

  },
  heartIcon: {
    textAlign: "center",
    fontSize: 22
  },
  rmBtnText: {
    color: "white"
  },
  buttons: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }

})
export default FavoriteList
