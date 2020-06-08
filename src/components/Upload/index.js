import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

//unf
export default class Upload extends Component{
    renderDragMessage = (isDragActive, isDragReject) => {
        if(!isDragActive){
            return <UploadMessage>Arraste arquivos .xlsx aqui...</UploadMessage>
        }
        if(isDragReject){
            return <UploadMessage type="error">Tipo de arquivo não suportado</UploadMessage>
        }
        return <UploadMessage type="sucess">Solte os arquivos aqui</UploadMessage>
    }

    render(){
        const { onUpload } = this.props;

        return (
            <Dropzone accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onDropAccepted={onUpload}>
                { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />
                        {this.renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                ) }
            </Dropzone>
        );
    }
}
