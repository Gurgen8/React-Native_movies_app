import React, { useState, useEffect, Fragment } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView, Pressable, Button, Modal, TouchableOpacity, Animated, View, FlatList, StyleSheet, Text, StatusBar, TextInput, Image, ScrollView, TouchableHighlight, Alert } from 'react-native';
const Nocover = require('../assets/img/nocover.jpg');
import { useSelector, useDispatch } from 'react-redux';
const IMAGE_API: string = "https://image.tmdb.org/t/p/w1280";
import { addBlackList, addFavouriteList, removeBlackListItem, removeFavouriteListItem } from "../redux/ListSlice";
const FEATURED_API: string = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7ecd0b11bc4cd387a22b43cb37086584";
const SEARCH_API: string = "https://api.themoviedb.org/3/search/movie?&api_key=7ecd0b11bc4cd387a22b43cb37086584&query=";

type title = {
  title?: string
}

const Item = ({ title }: title) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Films = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [emptyData, setEmptyData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterList,setFilterList]=useState([])
  const dispatch = useDispatch<any>();
  const BlackList = useSelector((state: any) => state.BlackList);

  const getMovies = (API: string) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => { setMovies(data.results.slice(0,100)); return setLoading(false) });
  };

  const handleOnSubmit = () => {
    if (searchTerm) {
      getMovies(`${SEARCH_API}${searchTerm}`);
      setSearchTerm("");
      if (movies) {
        setEmptyData("No data...")
      }
    }
    return setMovies(movies.filter((movie:any)=>{
      return   BlackList.find((list:any)=>list.id!==movie.id)   
   }))
    
  };



  useEffect(() => {
    getMovies(FEATURED_API)
    setLoading(true)
    return setMovies(movies.filter((movie:any)=>{
      return   BlackList.find((list:any)=>list.id!==movie.id)   
   }))
  }, []);

  
  
  const filtered = movies.filter( (movie:number|any) => !BlackList.find((list:number|any) => movie.id===list.id));

  
  const renderItem = ({ item }: any | number | string) =>
  (
    <View>
      {item.blacklist !== true ?
        <View style={styles.item}>
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.lang}>Lang:{item.original_language}</Text>
                  <Text style={styles.desc}>{item.overview}</Text>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <Image style={styles.img} source={item.poster_path ? { uri: IMAGE_API + item.poster_path } : Nocover} />
          <View style={styles.favoriteSection}>
            <View style={styles.buttonsSection}>
              {item.favourite == true ?
                <TouchableOpacity onPress={() => { item.favourite = false; return dispatch(removeFavouriteListItem(item.id)) }} >
                  <AntDesign name="heart" color={"red"} size={30} />
                </TouchableOpacity>
                :
                <Fragment>
                  <TouchableOpacity onPress={() => { item.favourite = true; return dispatch(addFavouriteList(item)) }} >
                    <AntDesign name="heart" size={30} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { return dispatch(addBlackList(item)) }} ><AntDesign name="dislike1" size={30} /></TouchableOpacity>
                </Fragment>
              }
            </View>
            <View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <AntDesign name="indent-left" color={"black"} size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.moviesTitle}><Item title={item.title} /></View>
          <View style={styles.votingSection}>
            <Text style={styles.votesCount}>
              <AntDesign name="like1" color={"#318CE7"} size={25} />  {item.vote_count}
            </Text>
            <Text style={styles.popularityDesc} >{item.popularity}  <AntDesign name="addusergroup" color={"blue"} size={30} /></Text>
          </View>
          <Text style={item.vote_average > 5 ? { color: "green", fontSize: 26, fontWeight: "900" } : { color: "brown", fontSize: 26 }} >{item.vote_average} <AntDesign name="star" color={"#F4CA16"} size={30} /></Text>
        </View>
        : null}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          keyboardType="default"
          placeholderTextColor="white"
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={handleOnSubmit} style={styles.searchButton}><AntDesign name="search1" size={30} color={"white"} /></TouchableOpacity>
      </View>
      {loading ? <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
        : null}
      {movies.length > 0 ?
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}

        />
        : <View style={styles.emptyView}>
          <Text style={styles.emptyText}>{emptyData}</Text>
        </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001333"
  },

  searchBar: {
    flexDirection: "row",
  },

  item: {
    backgroundColor: '#FDF5E6',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 3

  },

  searchButton: {
    color: "white",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    flex: 0.5,
    height: 44,
    textAlign: "center",
    marginTop: 12,
    marginRight: 15,
    borderRadius: 4,
    paddingTop: 4,
    paddingLeft: 12
  },

  title: {
    fontSize: 24,
    color: "darkblue",
    textAlign: "center",


  },
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: "white",
    borderColor: "white",
    flex: 3,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },

  img: {
    width: "100%",
    height: 230,
    resizeMode: "cover",
    marginTop: -20
  },
  votingSection: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  favoriteSection: {
    flexDirection: "row",
    marginTop: 5,
    alignContent: "space-between",
  },
  moviesTitle: {
    marginTop: -10,
  },
  spinnerTextStyle: {
    color: 'white',
    fontSize: 25
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 200,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    height: "100%",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 200
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 15
  },
  buttonClose: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#34B334",
    color: "red"
  },
  textStyle: {
    color: "#34B334",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    width: 120
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  emptyView: {
    height: "80%",
    padding: "20%"
  },
  emptyText: {
    textAlign: "center",
    color: "white",
    fontSize: 24
  },
  lang: {
    fontSize: 30,
    color: "brown"
  },
  desc: {
    color: "white",
    fontSize: 22
  },
  votesCount: {
    flex: 1, color:
      "black", fontSize: 20
  },
  buttonsSection: {
    flexDirection: "row",
    flex: 1
  },
  popularityDesc: {
    color: "black",
    fontSize: 20
  }
});

export default Films
