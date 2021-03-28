import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  PermissionsAndroid,
} from 'react-native';
import {Text, Input, Button, Modal, Spinner} from '@ui-kitten/components';
import Geolocation from 'react-native-geolocation-service';
import {sefaz_token} from '../../../env.js';
import api from '../../services/api';
import {generateHash} from '../../utils/hash';

export default function Calculadora() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opcoes, setOpcoes] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de Localização',
        message:
          'Esse aplicativo requer o uso da sua localização para funcionar corretamente.',
        buttonPositive: 'Aceitar',
        buttonNegative: 'Recusar',
      },
    );
  }

  async function getOptions() {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      Geolocation.getCurrentPosition(
        async position => {
          console.log(position);
          const response = await api.post(
            'http://api.sefaz.al.gov.br/sfz_nfce_api/api/public/consultarPrecosPorDescricao',
            {
              descricao: inputValue,
              dias: 3,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              raio: 1.5,
            },
            {
              headers: {
                AppToken: sefaz_token,
              },
            },
          );
          setOpcoes(response.data);
          setLoading(false);
        },
        error => {
          console.log(error.code, error.message);
        },
      );
    } else {
      const response = await api.post(
        'http://api.sefaz.al.gov.br/sfz_nfce_api/api/public/consultarPrecosPorDescricao',
        {
          descricao: inputValue,
          dias: 3,
          latitude: -9.6456,
          longitude: -35.71505,
          raio: 1.5,
        },
        {
          headers: {
            AppToken: sefaz_token,
          },
        },
      );
      setOpcoes(response.data);
      setLoading(false);
    }
  }

  function renderOpcoes() {
    return opcoes.map(opcao => {
      return (
        <TouchableOpacity
          key={generateHash()}
          style={styles.item}
          onPress={() => {
            const ingr = [...ingredientes];
            ingr.push(opcao);
            setIngredientes(ingr);
            setShowModal(false);
          }}>
          <Text key={generateHash()}>{opcao.dscProduto}</Text>
          {opcao.nomFantasia ? (
            <Text key={generateHash()}>{opcao.nomFantasia}</Text>
          ) : (
            <Text key={generateHash()}>{opcao.nomRazaoSocial}</Text>
          )}
          <Text key={generateHash()}>{opcao.valUltimaVenda}</Text>
        </TouchableOpacity>
      );
    });
  }

  function renderIngredientes() {
    return ingredientes.map((ingrediente, index) => {
      return (
        <View key={generateHash()} style={styles.ingredienteContainer}>
          <TouchableOpacity
            key={generateHash()}
            style={styles.item}
            onPress={() => {
              console.log(ingrediente);
            }}>
            <Text key={generateHash()} style={styles.ingredienteText}>
              {ingrediente.dscProduto}
            </Text>
            {ingrediente.nomFantasia ? (
              <Text key={generateHash()} style={styles.ingredienteText}>
                {ingrediente.nomFantasia}
              </Text>
            ) : (
              <Text key={generateHash()} style={styles.ingredienteText}>
                {ingrediente.nomRazaoSocial}
              </Text>
            )}
            <Text key={generateHash()} style={styles.ingredienteText}>
              {ingrediente.valUltimaVenda}
            </Text>
          </TouchableOpacity>
          <Button
            key={generateHash()}
            onPress={() => {
              const array = [...ingredientes];
              array.splice(index, 1);
              setIngredientes(array);
            }}>
            Apagar
          </Button>
        </View>
      );
    });
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>Adicione seus ingredientes abaixo!</Text>

      <View style={styles.container}>
        <Input
          placeholder="Ingrediente"
          style={styles.input}
          size="large"
          onChangeText={async texto => {
            setInputValue(texto);
          }}
        />
        <Button
          style={styles.button}
          onPress={async () => {
            Keyboard.dismiss();
            setLoading(true);
            await getOptions();
            setShowModal(true);
          }}>
          Pesquisar
        </Button>
      </View>

      {loading ? (
        <Spinner size="giant" />
      ) : (
        <Modal
          visible={showModal}
          style={styles.modal}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setShowModal(false)}>
          <ScrollView>{renderOpcoes()}</ScrollView>
        </Modal>
      )}

      <ScrollView>{renderIngredientes()}</ScrollView>

      {ingredientes.length ? (
        <Text>
          Total: R${' '}
          {ingredientes
            .reduce((ac, item) => ac + item.valUltimaVenda, 0)
            .toFixed(2)}
        </Text>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').height,
  },
  ingredienteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').height,
  },
  input: {
    width: 0.6 * Dimensions.get('screen').width,
    marginTop: 0.01 * Dimensions.get('screen').height,
    marginBottom: 0.01 * Dimensions.get('screen').height,
    borderColor: '#000',
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
    height: 0.065 * Dimensions.get('screen').height,
    marginTop: 0.01 * Dimensions.get('screen').height,
    marginBottom: 0.01 * Dimensions.get('screen').height,
    marginLeft: 0.01 * Dimensions.get('screen').width,
    fontSize: 10,
  },
  ingredienteText: {
    width: 0.7 * Dimensions.get('screen').width,
  },
  modal: {
    backgroundColor: '#FFF',
    width: 0.8 * Dimensions.get('screen').width,
    height: 0.8 * Dimensions.get('screen').height,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  item: {
    borderColor: '#000',
    margin: 10,
  },
});
