import React,{useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import LikeCard from '../components/LikeCard';
import Card from '../components/Card';
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';
import {firebase_db} from "../firebaseConfig"

export default function LikePage( {navigation,route}) {

    const {tip, setTip} = useState([])

    useEffect(()=>{
        navigation.setOptions({
            title:'꿀팁 찜'
        })
        getLike()
    },{})

    const getLike = async () => {
        let userUniqueId;
        if(isIOS){
        let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        }else{
            userUniqueId = await Application.androidId
        }

        console.log(userUniqueId)
        firebase_db.ref('/like/'+userUniqueId).once('value').then((snapshot) => {
            console.log("파이어베이스에서 데이터 가져왔습니다!!")
            let tip = snapshot.val();
            setTip(tip)
        })

        return {
            <ScrollView style={styles.container}>
              {
                tip.map((content,i)=>{
                    return(<LikeCard key={i}  content={content}  navigation={navigation}>
                        
                    </LikeCard>) 
                        
                 
                })
              }
        }
    }
}