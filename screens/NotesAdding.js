import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, StatusBar, View, Image, ScrollView, Modal, Alert} from "react-native";
import { Button, Card, FAB } from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const NotesAdding = (props) => {

	const [fiile, setFile] = useState()
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    const onUpload = (result) => {
		console.log(result)
		console.log("reached onUpload")
        const formData = new FormData();
        // This name i.e video should be used to collect data in backend
		formData.append('file',result);
		formData.append('upload_preset','eLearnApp');
		formData.append('cloud_name','ak-124210-bh');
		const response = fetch("https://api.cloudinary.com/v1_1/ak-124210-bh/auto/upload", {
			method: "post",
			body : formData
		})
		.then(res => res.json())
		.then(resilt =>{
			console.log(resilt.url)
		})
}

	// 	FileSystem.uploadAsync('https://agile-bastion-40085.herokuapp.com/videos', result.uri,{
	// 		headers: config.headers,
	// 		httpMethod: "POST",
	// 		uploadType: FileSystem.FileSystemUploadType.MULTIPART,
	// 	})
	// 	.then((res) => {
	// 		console.log(res)
	// 	})
	// 	.catch((err) => {
	// 		console.log(err.message)
	// 	})
	// }

		
		
		// axios.post("https://agile-bastion-40085.herokuapp.com/video",formData,config)
        // .then(res=>{
		// 	console.log(res, "uploaded")
        //     // Do some work
        // })
        // .catch(err=>{
		// 	console.log("hello")
        //     console.log(err.message);
        // })
	_pickDocument = async () => {
		console.log("here")
		let result = await DocumentPicker.getDocumentAsync({});
		console.log(result)
		let newFile = {
			uri : result.uri,
			type : "test/pdf",
			name: result.name
		}
		setFile(newFile)
	}
	return(
		<View style={ styles.container1 }>
		<ScrollView>
			<View style={{ flex:1, margin: 20, alignItems: 'center', backgroundColor: '#fafaff'}}>
				<Text style={{ marginTop: 20, fontSize: 20}}>NotesAdding</Text>
					<Button mode="contained" style={{ marginTop: 10 }} onPress={_pickDocument}>
							NotesAdding
					</Button>
					<Button mode="contained" style={{ marginTop: 10 }} onPress={()=>{ onUpload(fiile) }}>
							Add
					</Button>
				</View>
		</ScrollView>
	</View>
	)
}

const styles = StyleSheet.create({
	container1: {
		backgroundColor: "#fafaff",
		flex: 1,
	},
  
  });
  
export default NotesAdding


// Object {
//     "name": "NEG_3157.JPG",
//     "size": 6548785,
//     "type": "success",
//     "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540ak-bhatia%252Fshopstock/DocumentPicker/f0299552-436c-4ca0-839b-d89b8323b088.JPG",
//   }
