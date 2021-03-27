import React from 'react';
import {Dimensions, StyleSheet, SafeAreaView, View} from 'react-native';
import {sefaz_token} from '../../../env.js';
import {Text, Input, Button, Icon} from '@ui-kitten/components';
import api from '../../services/api';

export default function Calculadora() {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState([]);

  async function teste() {
    const response = await api.post(
      'http://api.sefaz.al.gov.br/sfz_nfce_api/api/public/consultarPrecosPorDescricao',
      {
        descricao: 'Teste',
        dias: 3,
        latitude: -9.6498,
        longitude: -35.7089,
        raio: 5,
      },
      {
        headers: {
          AppToken: sefaz_token,
        },
      },
    );
    const opcoes = response.data.map(item => ({
      title: item.dscProduto,
    }));
  }

  return (
    <SafeAreaView>
      <Text style={styles.text}>Adicione seus ingredientes abaixo!</Text>

      <View style={styles.container}>
        <Input placeholder="Ingrediente" style={styles.input} size="large" />
        <Button style={styles.button}>Pesquisar</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 0.6 * Dimensions.get('screen').width,
    marginTop: 0.01 * Dimensions.get('screen').height,
    marginBottom: 0.01 * Dimensions.get('screen').height,
  },
  text: {
    fontSize: 20,
    marginLeft: 0.02 * Dimensions.get('screen').width,
    marginTop: 0.01 * Dimensions.get('screen').height,
    marginBottom: 0.01 * Dimensions.get('screen').height,
  },
  icon: {
    width: 32,
    height: 32,
  },
  button: {
    width: 0.3 * Dimensions.get('screen').width,
    height: 0.07 * Dimensions.get('screen').height,
    marginTop: 0.01 * Dimensions.get('screen').height,
    marginBottom: 0.01 * Dimensions.get('screen').height,
    marginLeft: 0.01 * Dimensions.get('screen').width,
    fontSize: 10,
  },
});
