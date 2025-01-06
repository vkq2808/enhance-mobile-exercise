import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState<'Intro' | 'Homepage'>('Intro');

  useEffect(() => {
    if (currentPage === 'Intro') {
      const timer = setTimeout(() => {
        setCurrentPage('Homepage');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {currentPage === 'Intro' ? <IntroScreen /> : <Homepage />}
    </SafeAreaView>
  );
}

const IntroScreen = () => (
  <View style={styles.centered}>
    <Text style={styles.title}>Giới thiệu bản thân</Text>
    <Text style={styles.text}>
      Họ và tên: Vũ Khánh Quốc
    </Text>
    <Text style={styles.text}>
      MSSV: 21110848
    </Text>
  </View>
);

const Homepage = () => (
  <View style={styles.centered}>
    <Text style={styles.title}>Homepage</Text>
    <Text style={styles.text}>Đây là trang chủ!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default App;
