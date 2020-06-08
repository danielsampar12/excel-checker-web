import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div` 
    width: 100%;
    max-width: 400px;
    margin: 30px;
    background: #FFFF;
    border-radius: 4px;
    padding: 20px;
`;

export const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    
`;

export const Table = styled.table.attrs({
    id: 'incidentsTable'
})`
    text-align: center;
    width: 100%;
    max-width: 400px;
    margin: 30px;
    background: #FFFF;
    border-radius: 4px;
    padding: 20px;
    th, td{
        padding: 0 30px;
        button{
                border: 0;
                background: transparent;
                color: #cc4141;
                margin-left: 5px;
                cursor: pointer;
            }
    }
    tr:nth-child(even){background-color: #f2f2f2;}
    tr:hover {background-color: #ddd;}
`;
