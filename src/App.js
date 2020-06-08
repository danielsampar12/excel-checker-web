import React, { useEffect, useState } from 'react';
import api from './services/api';
import GlobalStyle from './global';
import { Container , Content, TextContainer, Table } from './styles';


import { Link } from 'react-router-dom';

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadEmps(){
      const response =  await api.get('/incidents');
      setIncidents(response.data);
    }
    loadEmps()
  }, []);

  async function handleDelete(id) {
    await api.delete(`/incidents/${id}`);
    setIncidents(incidents.filter(incident => incident._id !== id))
    
}

  return (
    <Container>
      <GlobalStyle />
        
        <main>
          <header><Content><TextContainer><Link to={'/upload'} target="_blank">Upload</Link></TextContainer></Content></header>
          <Table>
            <thead>
              <tr>
                <th key="">LINHA DA OCERRÊNCIA NA PLANILHA</th>
                <th key="">CNPJ CLIENTE</th>
                <th key="">CONTRATO</th>
                <th key="">RAZÃO SOCIAL DO CLEINTE</th>
                <th key="">PARCELA CONTESTADA</th>
                <th key="">DATA DE INCLUSÃO CONTRATO</th>
                <th key="">VCM VENDIDO</th>
                <th key="">VCM A RECEBER</th>
                <th key="">CONTESTAÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map(incident => (
                <tr>
                  <td>{incident.row}</td>
                  <td>{incident.nr_cnpj}</td>
                  <td>{incident.dc_chave_contrato}</td>
                  <td>{incident.dc_razao_social}</td>
                  <td>{incident.nr_nota_fiscal}</td>
                  <td>{incident.dt_inclusao_ctr.toLocaleString()}</td>
                  <td>{incident.vl_recorrente}</td>
                  <td>{incident.vl_comissao_calculado}</td>
                  <td>{incident.flag_erro_calculo && <strong>ERRO CALCULO</strong> || <strong>PARCELA NAO FOI PAGA</strong>}</td>
                  <td><button onClick={() => {}}>Excluir</button></td>
                </tr>
              )).reverse()}
            </tbody>
          </Table>
        </main>
    </Container>
  );
}

export default App;
