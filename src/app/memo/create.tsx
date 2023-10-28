import { View, TextInput, StyleSheet } from 'react-native'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'
import { router } from 'expo-router'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/icon'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db, auth } from '../../config'
import { useState } from 'react'

const handlePress = (bodyText: string): void => {
  if (auth.currentUser === null) {
    return
  }
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
  addDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then((docRef) => {
      console.log('success', docRef)
      router.back()
    })
    .catch((error) => {
      console.log(error)
    })
}

const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState('')
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={bodyText}
          style={styles.input}
          onChangeText={(text) => {
            setBodyText(text)
          }}
          autoFocus
        />
      </View>
      <CircleButton
        onPress={() => {
          handlePress(bodyText)
        }}
      >
        <Icon name="check" size={40} color="#fff" />
      </CircleButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24
  }
})

export default Create
