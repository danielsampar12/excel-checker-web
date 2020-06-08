import React, { Component, useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import GlobalStyle from '../../global';
import { Container , Content } from './styles';

import Upload from '../Upload';
import FileList from '../FileList';

import api from '../../services/api';

function UploadPage() {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        async function loadFiles() {
            const response = await api.get('posts');
            const files = response.data.map(file => ({
                id: file._id,
                name: file.name,
                readableSize: filesize(file.size),
                uploaded: true,
                url: file.url,
            }))
            setUploadedFiles(files)
        }
        loadFiles();
    }, [])

    function handleUpload (files){
        const uploadFiles = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }));
        setUploadedFiles([...uploadedFiles, uploadFiles]);

        uploadFiles.forEach(processUpload);
    };


    async function handleDelete(id) {
        await api.delete(`/posts/${id}`);
        setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
            //this.setState({
              //  uploadFiles: this.state.uploadFiles.filter(file => file.id !== id),
            //});
    }

    function updateFile(id, data) {
       setUploadedFiles(uploadedFiles.map(up => {
           return id === up.id
           ? {...up, ...data}
           : up
       }))
        // this.setState({ uploadFiles: this.state.uploadFiles.map(uploadedFile => {
          //  return id === uploadedFile.id 
          //  ? { ...uploadedFile, ...data } 
         //   : uploadedFile;
      // }) })
    };

    function processUpload(uploadedFile){
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);

        api.post('/posts', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round(e.loaded * 100 / e.total));
                updateFile(uploadedFile.id, {
                    progress,
                })
            }
        }).then(response => {
            updateFile(uploadedFile.id, {
                uploaded: true,
                id: response.data._id,
                url: response.data.url
            })
        }).catch(() => {
            updateFile(uploadedFile.id, {
                error: true
            })
        });
        setUploadedFiles([...uploadedFiles, uploadedFile])
    };

    return (
        <Container>
            <GlobalStyle />
            <Content>
                <Upload onUpload={handleUpload} />
                { !!uploadedFiles.length && <FileList files={uploadedFiles} onDelete={handleDelete}/>}
            </Content>
        </Container>
    );
}

export default UploadPage;


