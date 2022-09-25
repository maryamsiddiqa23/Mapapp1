import React from 'react'
import {
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'

const ImageButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.style}
    >
      <Image
        style={{ ...styles.img, ...props.style }}
        source={props.source}
      />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  img: {
    height: 70,
    width: 70,
  },
})

export default ImageButton