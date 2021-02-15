import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

let pinId = 0
const App = () => {
  const [pins, setPins] = useState([])
  const handleRegionChangeComplete = useCallback(({
    latitude, longitude, latitudeDelta, longitudeDelta
  }) => {
    const newPins = []
    for (let i = 1; i <= 20; i++) {
      for (let j = 1; j <= 20; j++) {
        const newPin = {
          id: pinId++,
          latitude: latitude - (latitudeDelta / 2) + ((latitudeDelta / 21) * i),
          longitude: longitude  - (longitudeDelta / 2) + ((longitudeDelta / 21) * j),
        }

        newPins.push(newPin)
      }
    }
    setPins(newPins)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'red', borderColor: '#ff0000', borderWidth: 2 }}>
      <MapView
        provider='google'
        style={{ flex: 1 }}
        mapType='satellite'
        initialRegion={{
          latitude: 32.7767,
          longitude: -96.7970,
          latitudeDelta: .001,
          longitudeDelta: .001,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {pins.map(pin => <Marker key={pin.id} coordinate={pin} />)}
      </MapView>
    </View>
  )
}

export default App
