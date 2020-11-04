// https://medium.com/@victormenezes35/select-async-reactjs-exemplos-com-api-rest-190db4847f93
import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

import {
  App,
  Main,
  Title,
  HomeButton,
  Botoes,
  CadastrarButton,
  LoginButton,
} from '../../styles/GlobalStyles';

import {
  CustoIndicator,
  IngredientePicker,
  IngredientesTable,
  NumberInput,
  SelectContainer,
  UnidadeIndicator,
} from './styled';

const styles = {
  icon: {
    marginLeft: 0,
    marginRight: 10,
    color: '#FFF',
    cursor: 'pointer',
  },
  h3: {
    marginTop: 30,
  },
};

export default function PageComponent() {
  const [idIngrediente, setIdIngrediente] = React.useState(undefined);
  const [nomeIngrediente, setNomeIngrediente] = React.useState(undefined);
  const [quantidadeIngrediente, setQuantidadeIngrediente] = React.useState(0);
  const [unidadeIngrediente, setUnidadeIngrediente] = React.useState('');
  const [precoIngrediente, setPrecoIngrediente] = React.useState('');
  const [quantidadeUsada, setQuantidadeUsada] = React.useState(0);
  const [dados, setDados] = React.useState([]);
  const dadosIngredientes = Array.from(dados);

  function mounted() {
    async function api() {
      // dadosIngredientes = await axios.get('/ingredientes/padrao');
    }
    api();
  }

  React.useEffect(mounted, []);

  const mapResponseToValuesAndLabels = data => ({
    value: data.id,
    label: data.nome,
    quantidade: data.quantidade,
    unidade: data.unidade,
    preco: data.preco,
  });

  async function callApi(value) {
    const data = await fetch(
      `https://glowing-vehicle-275016.rj.r.appspot.com/ingredientes/padrao`
    )
      .then(response => response.json())
      .then(response => response.map(mapResponseToValuesAndLabels))
      .then(final =>
        final.filter(i => i.label.toLowerCase().includes(value.toLowerCase()))
      );

    return data;
  }

  function renderIngredientes(novoDado) {
    const table = document.getElementById('listIngredientes');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${novoDado.nome}</td> <td>${novoDado.quantidade}${novoDado.unidade}</td> <td>R$ ${novoDado.custo}</td>`;
    tr.setAttribute('key', `${novoDado.id}`);
    tr.setAttribute('id', `ingrediente${novoDado.id}`);
    table.appendChild(tr);
    /* dados.forEach(item => {
      ul.innerHTML = '';
      const li = document.createElement('li');
      li.innerHTML = `${item.nome} - ${item.quantidade}${item.unidade} - R$ ${item.preco}`;
      return ul.appendChild(li);
    }); */
  }

  function addIngrediente() {
    let preco =
      parseFloat(precoIngrediente) *
      (parseFloat(quantidadeUsada) / parseFloat(quantidadeIngrediente));
    preco = preco.toFixed(2);
    const novoDado = {
      nome: nomeIngrediente,
      quantidade: quantidadeUsada,
      custo: preco,
      id: idIngrediente,
      unidade: unidadeIngrediente,
    };
    const dadosCopy = Array.from(dados);
    dadosCopy.push(novoDado);
    setDados(dadosCopy);
    dadosIngredientes.push(novoDado);
    renderIngredientes(novoDado);
  }

  return (
    <App>
      <Main>
        <Link to="/">
          <HomeButton>Home</HomeButton>
        </Link>
        <Botoes>
          <Link to="/cadastrar">
            <CadastrarButton>Cadastrar</CadastrarButton>
          </Link>
          <Link to="/login">
            <LoginButton>Login</LoginButton>
          </Link>
        </Botoes>
        <Title>Cálculo</Title>

        <IngredientePicker>
          <SelectContainer>
            <AsyncSelect
              cacheOptions
              loadOptions={callApi}
              onInputChange={() => {}}
              onChange={data => {
                setIdIngrediente(data.value);
                setNomeIngrediente(data.label);
                setUnidadeIngrediente(data.unidade);
                setQuantidadeIngrediente(data.quantidade);
                setPrecoIngrediente(data.preco);
              }}
              defaultOptions
            />
          </SelectContainer>
          <NumberInput
            type="number"
            placeholder="Quantidade"
            onChange={event => {
              setQuantidadeUsada(event.target.value);
            }}
          />
          <UnidadeIndicator>{unidadeIngrediente || 'unidade'}</UnidadeIndicator>
          <FaPlusCircle
            size={30}
            style={styles.icon}
            onClick={addIngrediente}
          />
        </IngredientePicker>

        <IngredientesTable id="listIngredientes">
          <tr>
            <th>Ingrediente</th>
            <th>Quantidade</th>
            <th>Custo</th>
          </tr>
        </IngredientesTable>

        <CustoIndicator>
          Custo Total: R${' '}
          {dados
            ? dados.reduce(
                (ac, item) => parseFloat(ac) + parseFloat(item.custo),
                0
              )
            : '0,00'}
        </CustoIndicator>
      </Main>
    </App>
  );
}
